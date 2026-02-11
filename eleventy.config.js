import * as esbuild from "esbuild";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("**/*.avif");

    // Register the image transform plugin
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ["webp", "jpeg"],
        widths: ["auto"],
        htmlOptions: {
            imgAttributes: {
                loading: "lazy",
                decoding: "async",
            },
            pictureAttributes: {},
        },
    });

    // Watch our TypeScript & SCSS files for changes.
    eleventyConfig.addWatchTarget("./src/**/*.js");
    eleventyConfig.addWatchTarget("./src/**/*.css");

    // Run the esbuild command before running Eleventy.
    eleventyConfig.on("eleventy.before", async function () {
        const isProduction = process.env.NODE_ENV === "production";
        // Build CSS (bundled)
        await esbuild.build({
            entryPoints: ["./src/assets/css/main.css"],
            outdir: "./_site/",
            bundle: true,
            minify: isProduction,
            sourcemap: !isProduction,
        });
        // Build web components/JS files (separate, not bundled)
        await esbuild.build({
            entryPoints: ["./src/assets/js/main.js"],
            outdir: "./_site/",
            bundle: false, // Keep files separate
            minify: isProduction,
            sourcemap: !isProduction,
            format: "esm", // Use ES modules for web components
        });
    });
}

// This named export is optional
export const config = {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // These are all optional:
    dir: {
        input: "src", // default: "."
        // includes: "../_includes",  // default: "_includes" (`input` relative)
        // data: "../_data",          // default: "_data" (`input` relative)
        output: "_site",
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.

    // pathPrefix: "/",
};
