import React from "react";
import Pet from "./Pet";
import { createRoot } from "react-dom/client";

// Component must return markup which will always be the result of `React.createElement` or JSX
// We are going to use JSX instead of this
const App = () => {
  //! second argument is the props, third argument is the children (can be an array)
  return React.createElement(
    "div", // we could give it either string or a component
    { id: "something-important" },
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        animal: "Dog",
        name: "Luna",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        animal: "Bird",
        name: "Pepper",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        animal: "Cat",
        name: "Doink",
        breed: "Mixed",
      }),
    ]
  );

  // <div>
  //   <h1>Adopt Me!</h1>
  //   <SearchParams />
  //   <Pet animal="dog" name="Luna" breed="Havanese" />
  //   <Pet animal="bird" name="Pepper" breed="Cockatiel" />
  //   <Pet animal="cat" name="Doink" breed="Mixed" />
  // </div>
};

const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement(App));

//# we are giving the App component to the render inside of the root element
root.render(<App />);
