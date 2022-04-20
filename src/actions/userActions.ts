interface Obj {
  type: string;
  payload: string;
}

interface Num {
  type: string;
}

const setUser = (userObj: string): Obj => {
  return {
    type: 'SET_USER',
    payload: userObj,
  };
};

const logOut = (): Num => {
  return {
    type: 'LOG_OUT',
  };
};

export default {
  setUser,
  logOut,
};
