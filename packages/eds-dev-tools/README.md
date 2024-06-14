# Shift Paradigm dev tools for Adobe Edge Delivery Services

A set of development and build tooling for Adobe Edge Delivery to leverage Vite
build tooling.

This is still in alpha, and so more documentation will arrive soon.

## Features & Setup

1. **Default Vite config.** Create a `vite.config.mjs` or `vite.config.mts` with
   the following contents:

    ```js
    export { default } from '@shiftparadigm/eds-dev-tools/vite.config';
    ```

2. **Vite build tooling.** With a `vite.config.*` file, use [Vite][vite] to
   build your EDS website. Add the following scripts to your `package.json`:

    ```json
    "scripts": {
        "start": "shift-aem",
        "build": "shift-aem-build"
    }
    ```

    Developers may use `npm start` to run the application, and build tooling may
    use `npm run build` to build it.

3. Set up GitHub Actions to build the branch without source.

    More documentation TODO

    1. Setup node
    2. `npm ci`
    3. `npm run build`
    4. Publish as though doing a GitHub pages build (with some tweaks to provide
       per-branch builds).

    Be sure to set up a GitHub Action to remove built branches when deleting
    source branches.
