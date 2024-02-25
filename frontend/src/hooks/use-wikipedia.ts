import { useEffect, useRef, useState } from "react";
import { DEBOUNCE_TIME, FETCH_WIKI, LIMIT } from "../contants/common";
import { UseWikipediaPropsT, UseWikipediaResponse, WikiPage } from "../components/types";
import { saveSearchHistory, sortWikipediaResult } from "../utils/search";

/**
 * This hook is responsible to make API call to our backend node server and fetch the wiki results.
 * @param props
 * @returns
 */
export function useWikipedia(props: UseWikipediaPropsT): UseWikipediaResponse {
  const { query } = props;
  const [loading, setLoading] = useState(false);
  const [wikis, setWikis] = useState<Array<WikiPage>>([]);
  const [error, setError] = useState(null);
  const searchedQuery = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (query) {
      clearTimeout(searchedQuery.current);
      setLoading(true);
      setWikis([]);
      setError(null);
      searchedQuery.current = setTimeout(() => search(query), DEBOUNCE_TIME);
    }
  }, [query]);

  function search(lastQuery: string) {
    saveSearchHistory(lastQuery);
    const url = `${FETCH_WIKI}?query=${lastQuery}&limit=${LIMIT}`;

    fetch(url)
      .then((d) => d.json())
      .then((data) => {
        if (query === lastQuery) {
          const pages = data || [];
          const sortedPages = sortWikipediaResult(pages);
          setWikis(sortedPages);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  return {
    loading,
    wikis,
    error,
  };
}
