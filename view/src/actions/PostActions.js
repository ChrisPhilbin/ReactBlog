export const GET_POST_START = "GET_POST_START";
export const GET_ONE_POST_SUCCESS = "GET_ONE_POST_SUCCESS";
export const GET_ONE_POST_FAILURE = "GET_ONE_POST_FAILURE";
export const GET_MANY_POSTS_SUCCESS = "GET_MANY_POSTS_SUCCESS";
export const GET_MANY_POSTS_FAILURE = "GET_MANY_POSTS_FAILURE";

export const getPost = () => ({ type: GET_POST_START });

export const getOnePostSuccess = (post) => ({
  type: GET_ONE_POST_SUCCESS,
  payload: post,
});

export const getOnePostFailure = () => ({
  type: GET_ONE_POST_FAILURE,
});

export const fetchOnePost = (postId) => {
  return async (dispatch) => {
    dispatch(getPost);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CORS}/posts/${postId}`
      );
      if (response.ok) {
        const post = response.json();
        dispatch(getOnePostSuccess(post));
      }
    } catch (error) {
      dispatch(getOnePostFailure());
    }
  };
};

export const getManyPostsSuccess = (posts) => ({
  type: GET_MANY_POSTS_SUCCESS,
  payload: posts,
});

export const getManyPostsFailure = () => ({
  type: GET_MANY_POSTS_FAILURE,
});

export const fetchManyPosts = () => {
  return async (dispatch) => {
    dispatch(getPost);
    try {
      const response = await fetch(`${process.env.REACT_APP_CORS}/posts`);
      if (response.ok) {
        const posts = await response.json();
        dispatch(getManyPostsSuccess(posts));
      }
    } catch (error) {
      dispatch(getManyPostsFailure);
    }
  };
};
