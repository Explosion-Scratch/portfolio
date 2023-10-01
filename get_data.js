import { createHash } from 'crypto';
import { createWriteStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { readdirSync, readFileSync } from 'fs';

let existing = readdirSync(resolve('.', 'public', 'project_images'));
let projects = JSON.parse(readFileSync(resolve('.', 'src', 'projects.json')));

getSpreadsheet('2PACX-1vQvFX6gBzJOJEU01O-R_iuMfCr-5k8aQAvEzumMh9nPKjoe3PcOKiZgfG7OWXX1ahV8Alv325H6UqUu').then(async data => {
    for (let i = 0; i < data.length; i++) {
        const project = data[i];
        if (!project.image) { continue; }
        const assetHash = hash(project.image);
        const p = projects.find(i => i.assetHash === assetHash)
        if (existing.find(i => i.includes(assetHash)) && p) {
            console.log('Already exists: ', assetHash);
            data[i] = {
                ...p,
                ...project,
            }
            continue;
        }
        console.log('Downloading: ', project.image)
        const res = await fetch(project.image);
        const contentType = res.headers.get('content-type');
        const contentLength = res.headers.get('content-length');
        const path = `${assetHash}.${contentType.split('/')[1]}`;

        const stream = createWriteStream(resolve('.', 'public', 'project_images', path));
        await finished(Readable.fromWeb(res.body).pipe(stream));
        console.log('Finished downloading:', project.image)
        data[i] = {
            ...project,
            assetHash,
            contentType,
            path,
            contentLength,
        };
    }
    writeFileSync(resolve('.', 'src', 'projects.json'), JSON.stringify(data, null, 2));
    upscaleGifs();
})

function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}
async function getSpreadsheet(id, pageNum = 1) {
    if (id.includes("/")) {
        //If the ID is a URL
        id = id.split("/")[6]
    }
    //Fetch data from google sheets and get JSON
    const out = await fetch(`https://docs.google.com/spreadsheets/d/e/${id}/pub?output=tsv`).then(res => res.text()).then((res) => {
        res = res.split("\n").map(i => i.trim()).map(i => i.split("\t"));
        return res
    })
    //Now we need to make it into an object based on the table headers.
    var out2 = [];
    for (let item of out) {
        let _temp = {};
        for (let i in item) {
            //Make it a nice object key.
            _temp[
                out[0][i]
                    //Lowercase
                    ?.toLowerCase()
                    //Replace all non alphanumeric characters
                    ?.replace(/[^a-zA-Z0-9 _]/g, "")
                    //Replace spaces with underscores
                    ?.replace(/ /g, "_") || '___deleteme'
            ] = item[i];
        }
        delete _temp['__deleteme']
        out2.push(_temp);
    }
    //We assume that the table has headers, so we take off the header row.
    return out2.slice(1);
}


import { exec } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { mkdir, readdir, rmdir } from 'fs/promises';
import { basename } from 'path';
import { promisify } from 'util';
import { resolve } from 'path';

async function upscaleGifs() {
    let orig = process.cwd();
    process.chdir(resolve('public', 'project_images'))
    const gifs = readdirSync('.').filter(i => i.endsWith('.gif'));
    console.log('Upscaling', gifs.length, 'files');
    for (let file of gifs) {
        console.log('STARTING ' + file);
        if (existsSync(file + '.mp4')) {
            console.log('SKIP ' + file);
            continue;
        }
        await upscaleGif(file);
    }
    process.chdir(orig);
}

async function upscaleGif(gif_path) {
    gif_path = resolve(gif_path);
    const [name, ext] = basename(gif_path).split('.');
    const folder = `${name}.${ext}-upscale`;

    console.log('[Creating folder] Starting...')
    await mkdir(`${folder}`, { recursive: true });
    await mkdir(`${folder}/images`, { recursive: true });
    console.log('[Creating folder] Done')

    console.log('[Splitting frames] Starting...')
    await runShell(`ffmpeg -i ${esc(gif_path)} -vsync 0 ${esc(resolve(`${folder}/images`, '%04d-frame.png'))}`);
    console.log('[Splitting frames] Done...')

    const dir = resolve(folder);

    console.log(dir);

    await main();

    console.log('[Creating video] Starting...')
    await runShell(`ffmpeg -framerate 30 -pattern_type glob -i ${esc(resolve(dir, 'upscaled', '*.png'))} -c:v libx264 -pix_fmt yuv420p ${name}.${ext}.mp4`)
    console.log('[Creating video] Done: ' + name + '.' + ext + '.mp4');

    await rmdir(folder, { recursive: true, force: true });

    async function runShell(command) {
        let out = await promisify(exec)(command, { stdio: 'inherit' });
        return out;
    }

    async function upscale(img) {
        if (existsSync(resolve(dir, img))) {
            return console.log('Image already upscaled', img);
        }
        await runShell(`waifu2x --scale 2 --noise 2 -i ${esc(resolve(dir, 'images', img))} -o ${esc(resolve(dir, 'upscaled', img))}`);
    }

    async function init() {
        await mkdir(resolve(dir, 'upscaled'), { recursive: true })
    }

    async function upscaleDir() {
        let files = await readdir(resolve(dir, 'images'));
        console.log('Upscaling', files.length, 'files');
        let count = 50;
        let todo = [...files];
        let promises = []
        for (let i = 0; i < count; i++) {
            addFile();
        }
        await until(() => todo.length === 0);
        console.log('All done!');
        function addFile() {
            let file = todo.pop();
            if (!file) { return }
            promises.push(new Promise(async resolve => {
                await upscale(file);
                console.log(`[Upscaling] ${Math.round(((files.length - todo.length) / files.length) * 100).toString().padStart(2, ' ')}%  [${files.length - todo.length}/${files.length}] ${file}`);
                addFile();
            }))
        }
        console.log('Done')
    }

    async function main() {
        await init();
        await upscaleDir();
    }

    function esc(str) {
        return JSON.stringify(str);
    }

    function chunk(arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }
        return chunks;
    }
}

async function until(fn, args = []) {
    return new Promise((resolve) => {
        async function repeat() {
            let result;
            try {
                result = fn(...args);
            } catch (_) { }
            if (!result) {
                setTimeout(repeat);
            } else {
                resolve(result);
            }
        }
        repeat();
    });
}