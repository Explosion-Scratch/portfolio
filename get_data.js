import { createHash } from 'crypto';
import { createWriteStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { readdirSync } from 'fs';

let existing = readdirSync(resolve('.', 'public', 'project_images'));
console.log(existing);

getSpreadsheet('2PACX-1vQvFX6gBzJOJEU01O-R_iuMfCr-5k8aQAvEzumMh9nPKjoe3PcOKiZgfG7OWXX1ahV8Alv325H6UqUu').then(async data => {
    for (let i = 0; i < data.length; i++) {
        const project = data[i];
        if (!project.image) { continue; }
        console.log('Downloading: ', project.image)
        const assetHash = hash(project.image);
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
