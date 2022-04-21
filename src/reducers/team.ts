const initialState = {
  teamList: [],
};
const path = window.location.hash;

const addTeam = (array: any, team: string, param: string) => {
  console.log(param);
  console.log(array);
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
        param: window.location.hash,
      },
    ]),
  );
}; //重複データが入らないようにするための対応

// const removeTeam = (array: Pro, team: string) => {
//   return array.filter((v: string, i: number) => v !== team);
// };

const entryTeam = (state = initialState, action: Act) => {
  switch (action.type) {
    case 'ADD_Team':
      return {
        ...state,
        teamList: addTeam(state.teamList, action.payload, window.location.hash),
      };
    // case 'REMOVE_Team':
    //   return {
    //     ...state,
    //     teamList: removeTeam(state.teamList, action.payload),
    //   };
    default:
      return state;
  }
};

export default entryTeam;
