import { Link } from "react-router-dom";
// import React from "react";

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//! Variablearity: we can pass as many children as we want and they will be rendered
//     React.createElement("h1", {}, props.name), // it doesn't have to be an array here because React will wrap it in an array
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);
// };

//# Equivalent code using JSX:

// const Pet = (props) => {
//   return (
//     <div>
//       <h1>{props.name}</h1>
//       <h2>{props.animal}</h2>
//       <h2>{props.breed}</h2>
//     </div>
//   );
// };

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    // It's better to use Link instead of a tag because it will prevent the page from reloading. We want to leverage the power of SPAs.
    // < href={`/details/${id}`} className="pet">
    <Link to={`details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
