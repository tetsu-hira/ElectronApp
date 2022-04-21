const initialState = {
  matchList: [],
};
// const path = window.location.hash;

const addMatch = (array: any, team: string, param: string) => {
  console.log(param);
  console.log(array);
  return Array.from(
    new Set([
      ...array,
      {
        ...array.param,
        users: team,
        time1: 0,
        time2: 0,
        count: 0,
        marks: 0,
        param: window.location.hash,
      },
    ]),
  );
}; //重複データが入らないようにするための対応

const removeMatch = (array: Scr[], index: number) => {
  console.log(array);
  console.log(index);

  array.splice(index, 1);
  const newArray = [...array];
  return newArray;
};

const controlMatch = (state = initialState, action: Act) => {
  switch (action.type) {
    case 'ADD_Match':
      return {
        ...state,
        matchList: addMatch(state.matchList, action.payload, window.location.hash),
      };
    case 'REMOVE_Match':
      return {
        ...state,
        matchList: removeMatch(state.matchList, action.index),
      };
    default:
      return state;
  }
};

export default controlMatch;
