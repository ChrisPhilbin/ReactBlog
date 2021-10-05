export const SESSION_STARTING = "SESSION_STARTING";
export const SESSION_START_SUCCESS = "SESSION_START_SUCCESS";
export const SESSION_START_FAILURE = "SESSION_START_FAILURE";
export const SESSION_END = "SESSION_END";

export const startSession = () => ({ type: SESSION_STARTING });

export const sessionStartSuccess = () => ({ type: SESSION_START_SUCCESS });

export const sessionStartFailure = () => ({ type: SESSION_START_FAILURE });

export const endSession = () => ({ type: SESSION_END });

export const login = (userData, props) => {
  return async (dispatch) => {
    dispatch(startSession);
    console.log("starting session...");
    try {
      console.log("Attempting to login...");
      const response = await fetch(`${process.env.REACT_APP_CORS}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const loggedIn = await response.json();
        await localStorage.setItem("AuthToken", `Bearer ${loggedIn.token}`);
        dispatch(sessionStartSuccess());
      }
    } catch (error) {
      dispatch(sessionStartFailure());
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    await localStorage.removeItem("AuthToken");
    dispatch(endSession());
  };
};
