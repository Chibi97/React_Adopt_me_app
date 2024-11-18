import { useState, useEffect } from "react";
/**
 * We create custom hooks to encapsulate logic that we can reuse in multiple components,
 * or just to get rid of the logic from the component to make it cleaner
 *
 * It's a good practice to create a custom hook when you want to use useEffect in your components more than 3 times
 */

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  /**
   *# If we want to have `async-await` inside of the `useEffect` we have to create an async function inside of it
   */
  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    console.log("localCache", localCache[animal]);

    /**
     *! This function is only available inside of this hook to use the variables from its scope
     * and so that ESLint doesn't complain that we call something that is not listed a depedency.
     *
     * This can be async and we can ignore its return value.
     * # So the whole `useEffect` is not async because we don't have to await this function and its return value.
     */
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
