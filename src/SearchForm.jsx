import { useState } from "react";
import useBreedList from "./hooks/useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

/**
 * ! Render functions are meant to be fast and stateless.
 * Stateless - We are not modifying global stuff or anything outside of the function
 * We are not allowed to have side effects in a render function
 */

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");

  /**
   * # We can also create a custom hook
   * - Custom hooks usually call a bunch of other hooks combined into one hook
   * - Functional components can't have side effects, but custom hooks can
   */
  const [breeds] = useBreedList(animal);

  // class is a reserved word in JavaScript, so we use className instead
  // for is reserved for for loops, so we use htmlFor instead
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          // e is a react synthetic event, not really a normal DOM event
          e.preventDefault();
          onSearch({ animal, breed, location }); //! method from a child component
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
