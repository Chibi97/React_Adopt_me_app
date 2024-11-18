const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  // ^ useQuery(["details", id]); -> the second parameter passed is the ID

  // We can give it as many parameters as we want, as well as an object of parameters

  const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!response.ok) {
    throw new Error(`details/${id} ~ fetch not ok`);
  }

  return response.json(); //! should return a promise
};

export default fetchPet;
