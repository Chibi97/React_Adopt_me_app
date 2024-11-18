import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src", //# if your `index.html` is outside src, on the root, you wouldn't need to specify the root here
});
/**
 * It goes into our `src` folder and find `index.html` file and it creates a graph from there..
 * It will understand our JS, JSX, CSS, and other files and it will bundle them together
 */
