

import axios from "axios";
import { server } from "../store";

export const register = (emailObj) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });


    const data  = await axios.post(`${server}/user/register`, emailObj, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("testing... in action", data.data)

    dispatch({
      type: "registerSuccess",
      payload: data.data.message,
    });
  } catch (error) {
    // console.log("ERROR...")
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    // console.log("login action", email, password)

    

    const data   = await axios.post(
      `${server}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

console.log("USER ACTION ==>>", data.data?.message)
    dispatch({
      type: "loginSuccess",
      payload: data.data?.message
    });
  } catch (error) {
    // console.log("error", error.response.data.message)
    dispatch({
      type: "loginFail",
      payload: error.response.data?.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const  data  = await axios.get(`${server}/user/me`, {
      withCredentials: true,
    });

    dispatch({
      type: "loadUserSuccess",
      payload: data.data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const data  = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
      payload: data.data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};