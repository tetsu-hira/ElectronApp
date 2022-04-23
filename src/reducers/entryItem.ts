const initialState = {
  itemList: [],
};

const addItem = (array: any, item: string) => {
  return Array.from(new Set([...array, item]));
}; //重複データが入らないようにするための対応

const removeItem = (array: any, item: string) => {
  return array.filter((v: string, i: string) => v !== item);
};

const entryItem = (state = initialState, action: Act) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        itemList: addItem(state.itemList, action.payload),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        itemList: removeItem(state.itemList, action.payload),
      };
    default:
      return state;
  }
};

export default entryItem;
