# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

11ty Micro is a minimal and lightweight static site generator built with Eleventy 3.x. The project uses ES modules (`"type": "module"` in package.json) and features TypeScript/JavaScript support via esbuild with a simple folder structure.

## Development Commands

**Development server with hot reloading:**
```bash
npm run dev
```
This starts Eleventy with `--serve` flag on http://localhost:8080

**Production build:**
```bash
npm run build
```
Sets `NODE_ENV=production` and runs Eleventy with minification enabled. Output goes to `_site/` directory.

## Build System Architecture

The build process is orchestrated through `eleventy.config.js` using the `eleventy.before` hook:

1. **CSS bundling** (entrypoint: `src/assets/css/main.css`)
   - Uses esbuild with `bundle: true`
   - Supports `@import` statements (e.g., importing `_variables.css`, `_reset.css`)
   - Minified in production, includes sourcemaps in development
   - Output: `_site/main.css`

2. **JavaScript processing** (entrypoint: `src/assets/js/main.js`)
   - Uses esbuild with `bundle: false` to keep files separate
   - Format: `esm` (ES modules) for web component support
   - Minified in production, includes sourcemaps in development
   - Output: `_site/main.js`

Watch targets are configured for `./src/**/*.js` and `./src/**/*.css` to trigger rebuilds during development.

## Image Handling

The project uses `@11ty/eleventy-img` plugin with automatic image transformation:
- Formats: `webp` and `jpeg`
- Width: `auto` (preserves original width)
- All images get `loading="lazy"` and `decoding="async"` attributes
- AVIF files are passed through directly via `addPassthroughCopy("**/*.avif")`

## Directory Structure

```
src/
  _includes/        # Layout templates (Nunjucks)
    base.njk       # Base layout with meta tags, CSS, and JS
  assets/
    css/
      main.css           # Main CSS entrypoint (imports other files)
      _variables.css     # CSS custom properties
      _reset.css         # CSS reset
      _typography.css    # Typography styles
      _components.css    # Component styles
    js/
      main.js           # Main JS entrypoint
    img/                # Images
  index.njk              # Homepage
_site/                   # Build output (generated)
```

## Template Configuration

- **Template formats**: `md`, `njk`, `html`
- **Markdown engine**: Nunjucks (`njk`)
- **HTML engine**: Nunjucks (`njk`)
- **Input directory**: `src/`
- **Output directory**: `_site/`

## Application Logic

The main JavaScript (`src/assets/js/main.js`) implements an interactive image gallery:
- Images are fetched from Cloudflare's imagedelivery.net CDN
- On page load, images are shuffled using Fisher-Yates algorithm
- Clicking anywhere in `<main>` prepends a new random-width figure element
- Uses modern patterns: event delegation, immutable state management, and ES6+ syntax
