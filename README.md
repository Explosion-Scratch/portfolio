<div align=center><h1>Portfolio</h1></div>


https://github.com/Explosion-Scratch/portfolio/assets/61319150/3ab490cb-1e48-498a-8b45-b8b5d74fd6c8


<div align=center><i></i>A portfolio website made with Svelte + TS + Vite, showcasing my projects</i></div>

## Interface
- Interactivity via Svelte
- Modular components with two way data bindings frequently used. Examples include for projects, cards, buttons, etc

## Scripting
- There is a `get_data.js` backend script which fetches from google sheets as well as several frontend scripts which contribute to various effects.

## Styling
- Done with SCSS mainly. See `src/main.scss` for some fun variables to change
- This is then compiled by Vite to a bundle

## Animation
- **GSAP**: Used for interactive and scroll based animations
- **Svelte Transitions**: Used here and there for some nice effects

## Data source
- Data is fetched from Google Sheets - See the code in get_data.js
- This is then written to projects.json
- All images from the Google Sheets are downloaded locally if they don't already exist
- GIFs are upscaled using `waifu2x` by splitting to frames, and combining back again to a high quality MP4.
