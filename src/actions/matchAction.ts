const addMatch = (team: string, param: string): Obj => {
  return {
    type: 'ADD_Match',
    payload: team,
    param: param,
  };
};
const removeMatch = (array: Mat[], index: number): Obn => {
  return {
    type: 'REMOVE_Match',
    payload: array,
    index: index,
  };
};

export default {
  addMatch,
  removeMatch,
};
