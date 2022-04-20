interface Obj {
  type: string;
  payload: string;
  param: string;
}

const addTeam = (team: string, param: string): Obj => {
  return {
    type: 'ADD_Team',
    payload: team,
    param: param,
  };
};
const removeTeam = (team: string, param: string): Obj => {
  return {
    type: 'REMOVE_Team',
    payload: param,
    param: window.location.pathname,
  };
};

export default {
  addTeam,
  removeTeam,
};
