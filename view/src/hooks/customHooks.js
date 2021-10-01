import React, { useEffect, useState } from "react";

export const useIsLoggedIn = (history) => {
  const authToken = localStorage.getItem("AuthToken");
  if (authToken === null) {
    history.push("/login");
  }
};

export const useCheckToken = () => {
  const authToken = localStorage.getItem("AuthToken");
  return authToken ? true : false;
};

export const useGetTokenFromLocalStorage = () => {
  const authToken = localStorage.getItem("AuthToken");
  return authToken;
};

export const useIsUserSessionActive = () => {
  let [status, setStatus] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    if (!authToken) {
      return false;
    }
    fetch(process.env.REACT_APP_CORS + "/user/auth", {
      method: "post",
      body: JSON.stringify({ idtoken: authToken }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        setStatus(true);
      } else {
        localStorage.removeItem("AuthToken");
        setStatus(false);
      }
    });
  }, []);

  return status;
};
