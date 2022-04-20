import { combineReducers } from 'redux';

import counter from './counter';
import currentUser from './currentUser';
import entryItem from './entryItem';
import entryTeam from './team';

const rootReducer = combineReducers({
  currentUser,
  counter,
  entryItem,
  entryTeam,
});

export default rootReducer;
