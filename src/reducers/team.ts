type Act = {
  type: string;
  payload: string;
};

const initialState = {
  teamList: [],
};
const path = window.location.pathname;

const addTeam = (array: any, team: any, param: any) => {
  console.log(param);
  console.log(array.filter((item: any) => item.param === param));
  return Array.from(
    new Set([
      ...array,
      {
        ...array.param,
        users: team,
        point: 0,
        score: 0,
        times: 0,
        count: 0,
        ratio: 0,
        param: window.location.pathname,
      },
    ]),
  );
}; //重複データが入らないようにするための対応

const removeTeam = (array: any, team: any) => {
  return array.filter((v: any, i: any) => v !== team);
};

const entryTeam = (state: any = initialState, action: Act): any => {
  switch (action.type) {
    case 'ADD_Team':
      return {
        ...state,
        teamList: addTeam(state.teamList, action.payload, window.location.pathname),
      };
    case 'REMOVE_Team':
      return {
        ...state,
        teamList: removeTeam(state.teamList, action.payload),
      };
    default:
      return state;
  }
};

export default entryTeam;
