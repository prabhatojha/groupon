import { SEARCH_HISTORY_KEY } from "../../contants/common";
import { sortWikipediaResult } from "../search";

describe("Search Util", () => {
  test("Should sort the data", () => {
    localStorage.setItem(SEARCH_HISTORY_KEY, "Phone");
    const items = [
      {
        title: "Call",
        id: 1,
      },
      {
        title: "My",
        id: 1,
      },
      {
        title: "Phone",
        id: 1,
      },
      {
        title: "Number",
        id: 1,
      },
    ];
    const result = sortWikipediaResult(items);

    expect(result).toEqual([
      {
        title: "Phone",
        id: 1,
      },
      {
        title: "Call",
        id: 1,
      },
      {
        title: "My",
        id: 1,
      },
      {
        title: "Number",
        id: 1,
      },
    ]);
  });

  test("Should sort the data with case sensitive title", () => {
    localStorage.setItem(SEARCH_HISTORY_KEY, "Phone");
    const items = [
      {
        title: "CALL",
        id: 1,
      },
      {
        title: "My",
        id: 1,
      },
      {
        title: "PHoNE",
        id: 1,
      },
      {
        title: "Number",
        id: 1,
      },
    ];
    const result = sortWikipediaResult(items);

    expect(result).toEqual([
      {
        title: "PHoNE",
        id: 1,
      },
      {
        title: "CALL",
        id: 1,
      },
      {
        title: "My",
        id: 1,
      },
      {
        title: "Number",
        id: 1,
      },
    ]);
  });

  test("Should not break on empty list", () => {
    localStorage.setItem(SEARCH_HISTORY_KEY, "Phone");
    expect(sortWikipediaResult([])).toEqual([]);
  });
});
