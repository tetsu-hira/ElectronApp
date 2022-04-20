interface Num {
  type: string;
}

const counter = (state: any = 1, action: Num): any => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

export default counter;
