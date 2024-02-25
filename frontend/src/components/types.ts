export type UseWikipediaPropsT = {
  query: string;
};
export type WikiPage = {
    title: string,
    id: number,
};
export type UseWikipediaResponse = {
  loading: boolean;
  wikis: Array<WikiPage>;
  error: Error | null;
};

export type SearchResultsPropsT = {
  items: Array<WikiPage>;
  loading: boolean;
};
