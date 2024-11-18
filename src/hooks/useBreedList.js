import fetchBreedList from "../queries/fetchBreedList";
import { useQuery } from "@tanstack/react-query";

//! using React Query
export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status];
}
