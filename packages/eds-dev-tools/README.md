# Shift Paradigm dev tools for Adobe Edge Delivery Services

A set of development and build tooling for Adobe Edge Delivery to leverage Vite
build tooling.

This is still in alpha, and so more documentation will arrive soon.

## Features & Setup

1. **Vite build tooling.** With a `vite.config.*` file, use [Vite][vite] to
   build your EDS website. Add the following scripts to your `package.json`:

    ```json
    "scripts": {
        "start": "shift-aem",
        "build": "shift-aem-build"
    }
    ```

    Developers may use `npm start` to run the application, and build tooling may
    use `npm run build` to build it.

2. Set up GitHub Actions to build the branch without source.

    More documentation TODO

    1. Setup node
    2. `npm ci`
    3. `npm run build`
    4. Publish as though doing a GitHub pages build (with some tweaks to provide
       per-branch builds).

    Be sure to set up a GitHub Action to remove built branches when deleting
    source branches.

3. **Optional: Customize Vite config.** If you need custom Vite tooling, you can
   create a `vite.config.mjs` or `vite.config.mts`; if you do not create one,
   your Vite config essentially acts as the following:

    ```js
    export { default } from '@shiftparadigm/eds-dev-tools/vite.config';
    ```

    You may use [Vite's `mergeConfig`][vite-merge-config] to customize this
    further, or provide your own.

[vite-merge-config]: https://vitejs.dev/guide/api-javascript.html#mergeconfig