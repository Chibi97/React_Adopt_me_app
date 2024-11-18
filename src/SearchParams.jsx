import { useEffect, useState } from "react";
// import Pet from "./Pet";
import Results from "./Results";
import SearchForm from "./SearchForm";

const SearchParams = () => {
  /**
   * ! Hooks
   * - You cannot define them in a conditional statement
   * - Doesn't matter that `pets` is "const", because when dependencies change, the component will be re-rendered
   * - Also, we will always use "setPets" to change the value of "pets"
   */
  const [pets, setPets] = useState([]);
  //  Equivalent to:
  const petsHook = useState("");
  const petsData = petsHook[0];
  const setPetsFn = petsHook[1];

  /**
   * ! useEffect hook ~ is basically a lifecycle hook
   * - Used for doing stuff when the component mounts, unmounts, or when a dependency changes
   * - It can send a request to an API, retrieve from localStorage, do something outside of the cycle of the component
   *
   * # Runs with every re-render of a component if we don't have an array of dependencies
   * - If we have an empty array, it will only run once at the beginning (onMounted in Vue)
   * - If we have a dependency, it will run every time that dependency changes (like a watcher for that dependency -> watchEffect in Vue)
   *     so it would ask us to add all dependencies to an array
   *
   * -It replaces a ComponentDidMount, ComponentDidUpdate, and ComponentWillUnmount in a class-component-React
   *
   * ! We are gonna replace `useEffect` with React Query in a new component `controlled-form/SearchParams.jsx`
   */
  useEffect(() => {
    // onMounted
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets(
    { animal = "", breed = "", location = "" } = {
      animal: "",
      breed: "",
      location: "",
    }
  ) {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <SearchForm onSearch={requestPets} />
      <Results pets={pets} />

      {/*
        ! Key is a special attribute in React that helps it keep track of what has changed in a list
        Without it, it would know that array changed, but it wouldn't know what changed. So it would re-render the whole list, which is inefficient.
        It would be like removing the whole list and re-adding it.
        With the key, it knows what changed and only re-renders that part of the list, reordering the elements as needed (for example, for soring)
       */}
      {/* {pets.map((pet) => (
        <Pet
          key={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
        />
      ))} */}
    </div>
  );
};

export default SearchParams;
