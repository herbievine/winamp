import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSearch } from "../api/use-search";
import { useDebounce } from "@uidotdev/usehooks";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [term, setTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(term, 300);
  const { search, isLoading } = useSearch(debouncedSearchTerm);

  return (
    <div className="p-2 flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-2 py-1 rounded-md text-gray-900 bg-gray-100 outline-none"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
      />
      {search && search.length > 0 ? (
        <ul className="flex flex-col space-y-6">
          <span>Showing {search.length} results</span>
          {search.map((result) => (
            <li key={result.albumId} className="flex space-x-2">
              <a
                href={`https://haxel.herbievine.com/album/${result.albumId}`}
                className="flex space-x-4"
              >
                <img src={result.url} className="w-20 h-20" />
                <div className="flex flex-col space-y-1">
                  <span>Name: {result.name}</span>
                  <span>Track count: {result.trackCount}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <span>No data</span>
      )}
    </div>
  );
}
