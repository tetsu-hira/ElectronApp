export declare global {
  interface Window {
    myAPI: {
      counter: (count: number) => number;
    };
  }
  interface RootState {
    entryItem: {
      /* ... */
    };
  }
}
