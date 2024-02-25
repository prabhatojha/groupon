import React from "react";
import { SearchResultsPropsT } from "../types";
import "./style.css";
import List from "rc-virtual-list";

/**
 * This component render the search result in a Virtual List container.
 * @param props
 * @returns
 */
export function SearchResults(props: SearchResultsPropsT) {
  const { items, loading } = props;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="search-result">
      {items.length ? (
        <List data={items} height={200} itemHeight={50} itemKey="id">
          {(item) => <div className="list-item">{item.title}</div>}
        </List>
      ) : (
        "No result found"
      )}
    </div>
  );
}
