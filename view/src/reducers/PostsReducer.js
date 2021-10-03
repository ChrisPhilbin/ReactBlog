import * as actions from "../actions/PostActions";

export const initialPostsState = {
  loading: false,
  onePost: {},
  manyPosts: [],
  hasErrors: false,
};

const postsReducer = (state = initialPostsState, action) => {
  switch (action.type) {
    case actions.GET_POST_START:
      return { ...state, loading: true };
    case actions.GET_ONE_POST_SUCCESS:
      return { ...state, loading: false, onePost: action.payload };
    case actions.GET_ONE_POST_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    case actions.GET_MANY_POSTS_SUCCESS:
      return { ...state, loading: false, manyPosts: action.payload };
    case actions.GET_MANY_POSTS_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
};

export default postsReducer;
