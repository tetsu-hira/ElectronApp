interface Num {
  type: string;
}

const increment = (): Num => {
  return {
    type: 'INCREMENT',
  };
};

const decrement = (): Num => {
  return {
    type: 'DECREMENT',
  };
};

export default {
  increment,
  decrement,
};
