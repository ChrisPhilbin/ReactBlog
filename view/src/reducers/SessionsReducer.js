import * as actions from "../actions/SessionActions";

export const initialSessionsState = {
  loading: false,
  isLoggedIn: false,
  hasErrors: false,
};

const sessionsReducer = (state = initialSessionsState, action) => {
  switch (action.type) {
    case actions.SESSION_STARTING:
      return { ...state, loading: true };
    case actions.SESSION_START_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true };
    case actions.SESSION_START_FAILURE:
      return { ...state, loading: false, isLoggedIn: false, hasErrors: true };
    case actions.SESSION_END:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default sessionsReducer;
