type Act = {
  type: string;
  payload: string;
};

const initialState = {
  itemList: [],
};

const addItem = (array: any, item: any) => {
  return Array.from(new Set([...array, item]));
}; //重複データが入らないようにするための対応

const removeItem = (array: any, item: any) => {
  return array.filter((v: any, i: any) => v !== item);
};

const entryItem = (state: any = initialState, action: Act): any => {
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
