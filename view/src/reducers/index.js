import { combineReducers } from "redux";
import sessionsReducer from "./SessionsReducer";

const rootReducer = combineReducers({
  sessions: sessionsReducer,
});

export default rootReducer;
