import { useContext } from "react";
import { API } from "../../core/backend";

import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const signin = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5500/api/signin",
      user,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the parsed JSON response
  } catch (error) {
    return error.response?.data || error.message; // Return the error details
  }
};


export const signout = () => {
  const authCtx = useContext(AuthContext); 
  const navigate = useNavigate(); 
  if (typeof window !== "undefined") {
     authCtx.logout(); 
     navigate('/')
  }

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user_id", JSON.stringify(data.user_id));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token")) || false;
  } else {
    return false;
  }
};
