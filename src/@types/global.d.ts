export declare global {
  interface Window {
    myAPI: {
      counter: (index: number, count: number, plus: number) => number;
    };
  }
  interface RootState {
    entryItem: {
      itemList;
    };
    entryTeam: {
      teamList;
    };
    controlMatch: {
      matchList;
    };
  }
  interface State {
    teamList: {
      //
    };
    itemList: {
      //
    };
  }
  interface Mat {
    users: string;
    time1: number;
    time2: number;
    point: number;
    score: number;
    param: string;
  }
  interface Pro {
    idnum: number;
    users: string;
    point: number;
    score: number;
    times: number;
    count: number;
    ratio: number;
    param: string;
  }
  interface Param {
    param: string;
  }
  interface Sor {
    key: number;
    order: number;
  }
  interface Add {
    users: string;
  }
  interface Act {
    type: string;
    payload: string;
    index: number;
  }
  interface Props {
    key: number;
    button: string;
    handleSort: (key: number) => void;
    sort: Sor | undefined;
  }
  interface Obj {
    type: string;
    payload: string;
    param: string;
  }
  interface Obn {
    type: string;
    payload: Scr[];
    index: number;
  }
}
