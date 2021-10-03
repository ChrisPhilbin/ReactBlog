import { combineReducers } from "redux";
import sessionsReducer from "./SessionsReducer";
import postsReducer from "./PostsReducer";

const rootReducer = combineReducers({
  sessions: sessionsReducer,
  posts: postsReducer,
});

export default rootReducer;
