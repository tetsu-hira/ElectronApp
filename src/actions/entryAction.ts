interface Obj {
  type: string;
  payload: string;
}

const addItem = (id: string): Obj => {
  return {
    type: 'ADD_ITEM',
    payload: id,
  };
};
const removeItem = (id: string): Obj => {
  return {
    type: 'REMOVE_ITEM',
    payload: id,
  };
};

export default {
  addItem,
  removeItem,
};
