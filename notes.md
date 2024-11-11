# Notes

## ESLint, Prettier and NPM

- Prettier should be last in the extends array of `eslintrc`
- ecmaVerion 2016 and before won't allow `async-await`
- "module" type allow us imports/exports not CommonJS
- ENV "browser" allows us to use `fetch` that exist in Browsers, and "node" allows us to use `__dirname`.

  - That means that ESLint wouldn't complain about it.
  - What globals are available

- `npm run lint -- --debug` -> passing "debug" param to eslint directly, not to `npm`
