import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchResults } from "../Search-results";

describe("SearchResults component", () => {
  test("Should render no result", () => {
    render(<SearchResults items={[]} loading={false} />);
    expect(screen.getByText("No result found")).toBeDefined();
  });

  test("Should render search result", () => {
    render(<SearchResults items={[{title: 'iPhone XR', id: 123}]} loading={false} />);
    expect(screen.getByText("iPhone XR")).toBeDefined();
  });
});
