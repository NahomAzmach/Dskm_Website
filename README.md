# DSKM Church Website

Modern React/Vite rebuild of the Debre Selam Kidus Michael church website.

The site preserves the old church content and media archive while reorganizing it into a cleaner multi-page structure with Amharic/English support.

## Stack

- React
- React Router
- Vite

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx`: main UI and route rendering
- `src/content.js`: page content and route-backed section data
- `src/assets.js`: shared asset URL helpers
- `src/siteUtils.js`: formatting and rendering utilities
- `src/mediaLibrary.js`: shared image libraries and gallery helpers
- `src/styles.css`: site styles
- `eotcdskm-export/`: scraped content and legacy static assets from the old site

## Notes

- Navigation labels stay in English by design.
- Amharic and English page content are both maintained in the source.
- Legacy images are preserved in the Media & Gallery archive.
