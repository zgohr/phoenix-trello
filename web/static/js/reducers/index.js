import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import registration from './registration';
import boards from './boards';
import currentBoard from './current_board';

export default combineReducers({
  routing: routerReducer,
  session: session,
  registration: registration,
  boards: boards,
  currentBoard: currentBoard,
})