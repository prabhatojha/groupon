import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../Search";
import { INVALID_QUERY_TEXT, WENT_WRONG_ERROR } from "../../../contants/common";

import * as UseWikipediaModule from "../../../hooks/use-wikipedia";
jest.mock("../../hooks/use-wikipedia");

const mockedWikipediaModule = jest.mocked(UseWikipediaModule);


describe("Search component", () => {
  beforeEach(() => {
    mockedWikipediaModule.useWikipedia.mockReturnValue({
      loading: false,
      wikis: [],
      error: null,
    });
  })
  test("Should render search component", () => {
    render(<Search />);
    const linkElement = screen.getByText("Search Mypedia");
    expect(linkElement).toBeInTheDocument();
  });

  test("User should be able to type valid text", () => {
    render(<Search />);
    const input = screen.getByTestId("query-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input.value).toBe("Hello");

    expect(() => screen.getByText(INVALID_QUERY_TEXT)).toThrow();
  });

  test("Should throw query validation error", () => {
    render(<Search />);
    const input = screen.getByTestId("query-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello!!!" } });
    expect(input.value).toBe("Hello!!!");
    expect(screen.getByText(INVALID_QUERY_TEXT)).toBeDefined();
  });

  test("User should be able to see the search result", () => {
    mockedWikipediaModule.useWikipedia.mockReturnValue({
      loading: false,
      wikis: [{title: 'Hello world', id: 123}, {title: 'Hello there', id: 456}],
      error: null,
    });
    render(<Search />);

    const input = screen.getByTestId("query-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(screen.getByText('Hello world')).toBeDefined();
    expect(screen.getByText('Hello there')).toBeDefined();
  });

  test("Should handle API error failure", () => {
    mockedWikipediaModule.useWikipedia.mockReturnValue({
      loading: false,
      wikis: [],
      error: new Error('Went wrong'),
    });
    render(<Search />);

    const input = screen.getByTestId("query-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(screen.getByText(WENT_WRONG_ERROR)).toBeDefined();
  });
});
