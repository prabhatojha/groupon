/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { act, renderHook, waitFor } from "@testing-library/react";
import { useWikipedia } from "../use-wikipedia";

describe("useWikipedia hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      switch (url) {
        case "http://localhost:3002/api/search?query=test&limit=25":
          return Promise.resolve({
            json: () => Promise.resolve([{ title: "hello" }]),
          });
          case "http://localhost:3002/api/search?query=failed-query&limit=25":
            return Promise.resolve({
              json: () => Promise.reject("failed api call"),
            });
      }
    });
  });

  test("should render the hook", () => {
    const { result } = renderHook(useWikipedia, {
      initialProps: {
        query: "empty",
      },
    });
    expect(result.current.wikis).toEqual([]);
  });

  test("should render the hook with data", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(useWikipedia, {
      initialProps: {
        query: "test",
      },
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.loading).toEqual(true);

    await waitFor(() => {
      expect(result.current.wikis).toEqual([{"title": "hello"}]);
      expect(result.current.loading).toEqual(false);
    });

    jest.useRealTimers();
  });

  test("should handle failed api call", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(useWikipedia, {
      initialProps: {
        query: "failed-query",
      },
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.loading).toEqual(true);

    await waitFor(() => {
      expect(result.current.wikis).toEqual([]);
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual('failed api call');
    });

    jest.useRealTimers();
  });
});
