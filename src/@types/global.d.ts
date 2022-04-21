export declare global {
  interface Window {
    myAPI: {
      counter: (count: number) => number;
    };
  }
  interface RootState {
    entryItem: {
      itemList;
    };
    entryTeam: {
      teamList;
    };
  }
  interface State {
    teamList: {
      //
    };
  }
  interface Scr {
    users: string;
    time1: number;
    time2: number;
    count: number;
    marks: number;
  }
  interface Pro {
    idnum: number;
    users: string | undefined;
    point: number;
    score: number;
    times: number;
    count: number;
    ratio: number;
    param: string;
  }
  interface Par {
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
  }
  interface Props {
    key: number;
    button: string;
    handleSort: (key: number) => void;
    sort: Sor | undefined;
  }
}
