export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_ONE_CATEGORY_SUCCESS = "GET_ONE_CATEGORY_SUCCESS";
export const GET_ONE_CATEGORY_FAILURE = "GET_ONE_CATEGORY_FAILURE";
export const GET_MANY_CATEGORIES_SUCCESS = "GET_MANY_CATEGORIES_SUCCESS";
export const GET_MANY_CATEGORIES_FAILURE = "GET_MANY_CATEGORIES_FAILURE";

export const getCategories = () => ({ type: GET_CATEGORIES });

export const getOneCategorySuccess = (category) => ({
  type: GET_ONE_CATEGORY_SUCCESS,
  payload: category,
});

export const getOneCategoryFailure = () => ({ type: GET_ONE_CATEGORY_FAILURE });

export const getManyCategoriesSuccess = (categories) => ({
  type: GET_MANY_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getManyCategoriesFailure = () => ({
  type: GET_MANY_CATEGORIES_FAILURE,
});

export const fetchOneCategory = (categoryName) => {
  return async (dispatch) => {
    dispatch(getCategories());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CORS}/categories/${categoryName}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getOneCategorySuccess(data));
      }
    } catch (error) {
      dispatch(getOneCategoryFailure());
    }
  };
};

export const fetchManyCategories = () => {
  return async (dispatch) => {
    dispatch(getCategories());
    try {
      const response = await fetch(`${process.env.REACT_APP_CORS}/categories`);
      if (response.ok) {
        const data = response.json();
        dispatch(getManyCategoriesSuccess(data));
      }
    } catch (error) {
      dispatch(getManyCategoriesFailure());
    }
  };
};
