# Notes

## React 101

- React v18 has concurency mode, `createRoot` function
  - `ReactDOM.render(container, <App />)` old way to render App component
- You can even do `root.render()` to force update the whole application, which is convenient sometimes, but not recommended

## Tooling

### ESLint, Prettier and NPM

- In extends we include all the plugins for ESLint, that's why the prefix is "plugin:...":

```json
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
```

- Prettier should be last in the extends array
- ecmaVerion 2016 and before won't allow `async-await`
- "module" type allow us imports/exports not CommonJS
- ENV "browser" allows us to use `fetch` that exist in Browsers, and "node" allows us to use `__dirname`.

  - That means that ESLint wouldn't complain about it.
  - What globals are available

- `npm run lint -- --debug` -> passing "debug" param to eslint directly, not to `npm`

- ESLint wants to know which version of React we are using so it can support us accordingly, so by writing this we tell it to go to the `package.json` and figure it out

```json
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
```

- We also need to the the import resolver to look for JSX files. By default it looks just at JS files. That's why it complains that we are importing Pet component which it cannot find since it has `.jsx` extension.

- To include plugins we need to:

```json
  "plugins": [
    "react",
    "import", // allow eslint to follow imports to see if we imported/exported everything that we use correctly
    "jsx-a11y" // for accessibility errors
  ],
```

- To override plugin rules, we can:

```json
 "rules": {
    "react/prop-types": "off", // replacement for TS but it has silly errors
    "react/react-in-jsx-scope": "off" // With React v17 we can avoid writing import for React in components, which used to be a rule
  },
```

### Vite

- Build tools: Browserify, Grunt, Gulp, Webpack, Parcel, Vite

  - Parcel is zero-config but Vite is the standard nowdays
  - Vite is fast, comes from the Vue team, and uses Rollup under the hood (Rich Harris who created Svelte)

- The `type="module"` is for Vite to know that we use ES6 modules, not commonJS

```html
<script type="module" src="./App.jsx"></script>
```

- Files have to be called with extension `jsx` because Vite will not transpile it that unless we use `.jsx`

- Vite, per our config, goes into our `src` folder and find `index.html` file and it creates a graph from there.. It will understand our JS, JSX, CSS, and other files and it will bundle them together.

- Tree-shaking means Live Code Inclusion only includes code that we are actively using. It is different than dead code elimination which will try to find things that we never called and eliminate it.

  - By importing `import { createRoot } from "react-dom";` just some functions, variables from a module/library, we allow Vite the opportunity to eliminate code and make a smaller bundle for us.

- `"dev": "vite"` -> start a dev server
- `"build": "vite build"` -> get me ready for production, build static files, CI stuff
- `"preview": "vite preview"` -> runs `vite build` and then shows us what has been built

## Core principles

### Basics

- Render functions are meant to be fast and stateless.
  - Stateless - We are not modifying global stuff or anything outside of the function
- We are not allowed to have side effects in a render function
- class is a reserved word in JavaScript, so we use className instead
- for is reserved for for loops, so we use htmlFor instead
- For loops are gonna be written using `map` function

### Hooks

- You cannot define them in a conditional statement
- Doesn't matter that location is "const", because when dependencies change, the component will be re-rendered
- Also, we will always use "setLocation" to change the value of "location" - We can also create a custom hook
- Custom hooks usually call a bunch of other hooks combined into one hook
- Function components can't have side effects, but custom hooks can
