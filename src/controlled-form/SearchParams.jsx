import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "../hooks/useBreedList";
import Results from "../Results";
import fetchSearch from "../queries/fetchSearch";
import AdoptedPetContext from "../utilities/adoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

/**
 * # If we are not using React Query and want to call requestPets when requestParams change, we would need to use useEffect
 *  to track the changes and call fetching of pets.
 *  React's re-rendering alone wouldn't automatically call requestPets when requestParams change!
 */

const SearchForm = () => {
  const [adoptedPet] = useContext(AdoptedPetContext); // pulling the data from the Provider

  const [animal, setAnimal] = useState(""); // still controlled by us because we need to be able to pass it into BreedList
  /**
   * We can also create a custom hook
   * - Custom hooks usually call a bunch of other hooks combined into one hook
   * - Functional components can't have side effects, but custom hooks can
   */
  const [breeds] = useBreedList(animal);

  const [requestParams, setRequestParams] = useState({
    //! This is an object because its hash key won't changed, and we need it for caching mechanism in useQuery!
    animal: "",
    breed: "",
    location: "", // Initially we fetch all pets
  });
  //
  // # useQuery will track the changes of its key (["search", requestParams]) and will re-fetch the data when any part of the key changes
  // That's why we don't need useEffect to track the changes of requestParams, useQuery already does that besides caching.
  const result = useQuery(["search", requestParams], fetchSearch); // The query key is used to uniquely identify the query.
  const pets = result.data?.pets || [];

  // class is a reserved word in JavaScript, so we use className instead
  // for is reserved for for loops, so we use htmlFor instead
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          // e is a react synthetic event, not really a normal DOM event
          e.preventDefault();
          const formData = new FormData(e.target); //! Browser API that will pull data from the form into this object
          const obj = {
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
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
          <select disabled={!breeds.length} id="breed" name="breed">
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

      {result.isLoading ? (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        <Results pets={pets} />
      )}
    </div>
  );
};

export default SearchForm;
