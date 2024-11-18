const fetchSearch = async ({ queryKey }) => {
  const { animal, breed, location } = queryKey[1];

  const response = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!response.ok) {
    throw new Error(
      `fetchSearch ~ pet search not ok ${animal}, ${breed}, ${location}`
    );
  }

  return response.json();
};

export default fetchSearch;

/**
 * ! The useQuery hook from react-query abstracts away the asynchronous nature of data fetching and provides a synchronous-looking API.
 *
 * When useQuery is first called, it returns an object that includes the current state of the query (e.g., isLoading, isError, data, etc.).
 * # Initially, data will be undefined because the query has not yet completed. Instead of getting a Promise, we get "undefined".
 * ? That's why fallback data is useful (?? [])
 *
 * # While the query is in progress, useQuery will set isLoading to true.
 * You can use this state to show a loading indicator in your UI.
 *
 * ✔️ Once the query completes, useQuery updates the data property with the fetched data.
 *
 * ! If the query fails, useQuery will set isError to true and provide an error object.
 */
