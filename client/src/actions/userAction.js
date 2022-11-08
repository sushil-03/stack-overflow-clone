import axios from "axios";
import {
    LOGIN_USER_SUCCESS,
    LOGIN_REQUEST,
    LOAD_USER_FAIL,
    REGISTER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOAD_ALL_USER_REQUEST,
    LOAD_ALL_USER_SUCCESS,
    LOAD_ALL_USER_FAIL,
    CLEAR_ERROR,
} from "../constant/userConstant";

export const login =
    (email, password, isOtpVerified = false) =>
    async (dispatch) => {
        try {
            dispatch({ type: LOGIN_REQUEST });
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.post(
                "/api/v1/login",
                { email, password, isOtpVerified },
                config
            );

            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.user });
        } catch (error) {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: error.response.data.message,
            });
        }
    };
export const signin = (FormData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post("/api/v1/signup", FormData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const logout = () => async (dispatch) => {
    await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: "Logout Successully" });
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const response = await axios.get("/api/v1/me");
        dispatch({ type: LOAD_USER_SUCCESS, payload: response.data.user });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_ALL_USER_REQUEST });
        const response = await axios.get("/api/v1/users");
        dispatch({ type: LOAD_ALL_USER_SUCCESS, payload: response.data.user });
    } catch (error) {
        dispatch({
            type: LOAD_ALL_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
