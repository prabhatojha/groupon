import { useState } from "react";
import { SearchResults } from "../search-results/Search-results";
import { useWikipedia } from "../../hooks/use-wikipedia";
import './style.css';
import { INVALID_QUERY_TEXT, QUERY_VALIDATION_REGEX, WENT_WRONG_ERROR } from "../../contants/common";

/**
 * Responsible for rendering Input Search box and Search results both
 */
export function Search() {
  const [query, setQuery] = useState('');
  const isValidQuery = QUERY_VALIDATION_REGEX.test(query);
  const { wikis, loading, error } = useWikipedia({ query: isValidQuery? query: '' });

  function onQueryChange(e: any) {
    setQuery(e.target.value);
  }

  return (
    <div className="container">
      <div>
        <h2>Search Mypedia</h2>
        <input data-testid='query-input' onChange={onQueryChange} value={query} placeholder="Type your query" />
      </div>
      {!isValidQuery && INVALID_QUERY_TEXT}
      {error && WENT_WRONG_ERROR}
      {!error && isValidQuery && query && <SearchResults loading={loading} items={wikis} />}
    </div>
  );
}
