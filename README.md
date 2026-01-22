# 11ty Micro

A minimal and lightweight starter template for building static websites with [Eleventy](https://www.11ty.dev/) (11ty). This project includes TypeScript support via esbuild and a simple folder structure to get you started quickly.

## Features

- ⚡️ Fast builds with Eleventy 3.x
- 📝 Nunjucks templating
- 🎨 CSS organization with components and variables
- 🔧 TypeScript support with esbuild
- 🗜️ HTML minification for production
- 🔥 Hot reloading development server

## Installation

1. Clone or download this repository:

    ```bash
    git clone <repository-url>
    cd 11ty-micro
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and visit `http://localhost:8080`

## Build for Production

To create an optimized production build:

```bash
npm run build
```

The compiled site will be in the `_site` directory.
