// import React from "react";
// import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Tree-shaking: we are only importing the createRoot function from react-dom instead of the whole library (import ReactDOM from "react-dom")
// import Pet from "./Pet";

// import SearchParams from "./SearchParams";
import SearchParams from "./controlled-form/SearchParams"; // Controlled form
import Details from "./Details";
import AdoptedPetContext from "./utilities/adoptedPetContext";

/**
 * You could have multiple query clients in your app, but you can only have one provider per client
 * We could use that if we want multiple query clients that query same routes but don't share the same cache (edge case)
 **/
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // How long the data is considered fresh (we don't need to refetch it for that time)
      cacheTime: Infinity, // How long the data is kept in the cache, 1000 * 60 * 10 = 10 minutes
    },
  },
});

// Component must return markup which will always be the result of React.createElement or JSX
// We are going to use JSX instead of this
// const App = () => {
//   //! second argument is the props, third argument is the children (can be an array)
//   return React.createElement(
//     "div", // we could give it either string or a component
//     { id: "something-important" },
//     [
//       React.createElement("h1", {}, "Adopt Me!"),
//       React.createElement(Pet, {
//         animal: "Dog",
//         name: "Luna",
//         breed: "Havanese",
//       }),
//       React.createElement(Pet, {
//         animal: "Bird",
//         name: "Pepper",
//         breed: "Cockatiel",
//       }),
//       React.createElement(Pet, {
//         animal: "Cat",
//         name: "Doink",
//         breed: "Mixed",
//       }),
//     ]
//   );
// };
const App = () => {
  const adoptedPetHook = useState(null);
  return (
    // <StrictMode> -- works only in development mode
    // StrictMode would warn us about deprecated features, unsafe lifecycle methods, and other potential issues in our code

    /**
     * ! BrowserRouter - higher order component
     * Using this, all comments beneath will be able to access its context
     *
     * # A higher order component doesn't render anything itself, but wraps other components
     * We wrap basically everything in our app with QueryClientProvider to have its context everywhere, same as with BrowserRouter
     */
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPetHook}>
          {/* We are making `adoptedPetHook` hook (both adoptedPetHook[0] -> value and adoptedPetHook[1] -> set fn)
            available to every CONSUMER (every child in the tree nested here) of this Provider
           */}
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>

    // <div>
    //   <h1>Adopt Me!</h1>
    //   <SearchParams />
    // // <Pet animal="dog" name="Luna" breed="Havanese" />
    // // <Pet animal="bird" name="Pepper" breed="Cockatiel" />
    // // <Pet animal="cat" name="Doink" breed="Mixed" />
    // </div>
    // </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement(App));
//# we are giving the App component to the render inside of the root element
root.render(<App />); // we could wrap App with ErrorBoundary here!!