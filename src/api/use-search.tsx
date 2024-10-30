import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { z } from "zod";
import { fetcher } from "../lib/fetcher";

async function getSearch(term: string) {
  const searchParams = new URLSearchParams();

  searchParams.set("q", term);

  return fetcher(
    `${import.meta.env.VITE_API_URL}/search?${searchParams}`,
    z
      .object({
        albumId: z.number(),
        name: z.string(),
        trackCount: z.number(),
        releaseYear: z.string(),
        url: z.string().url(),
      })
      .array(),
  );
}

export function searchOptions(term: string) {
  return queryOptions({
    queryKey: ["search", term],
    queryFn: () => getSearch(term),
    staleTime: 10 * 1000,
  });
}

export function useSearch(term: string) {
  const { data, ...query } = useQuery(searchOptions(term));

  return {
    search: data,
    ...query,
  };
}

export function useSuspenseSearch(term: string) {
  const { data, ...query } = useSuspenseQuery(searchOptions(term));

  return {
    search: data,
    ...query,
  };
}
