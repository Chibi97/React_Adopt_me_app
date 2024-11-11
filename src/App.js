/**
 * React v18 has concurency mode, createRoot function -- old way: //^ ReactDOM.render(container, <App />)
 * You can even do `root.render()` to force update the whole application, which is convenient sometimes, but not recommended
 **/

const Pet = (props) => {
  return React.createElement("div", {}, [
    // Variablearity: we can pass as many children as we want and they will be rendered,
    React.createElement("h1", {}, props.name), // it doesn't have to be an array here because React will wrap it in an array
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

// Component must return markup which will always be the result of React.createElement or JSX
const App = () => {
  //! second argument is the props, third argument is the children (can be an array)
  return React.createElement(
    // we are going to use JSX instead of this
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
};
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App)); // we are giving the App component to the render inside of the root element
