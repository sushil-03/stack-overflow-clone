import {
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOAD_USER_SUCCESS,
    CLEAR_ERROR,
    LOAD_ALL_USER_REQUEST,
    LOAD_ALL_USER_FAIL,
    LOAD_ALL_USER_SUCCESS,
} from "../constant/userConstant";
const initialState = {
    isLoading: false,
    isAuthenticated: false,
    users: null,
    user: null,
    error: null,
};
export const userReducer = (
    state = {
        isLoading: false,
        isAuthenticated: false,
        users: null,
        user: null,
        error: null,
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                isLoading: true,
                isAuthenticated: false,
                user: null,
                error: null,
                users: null,
            };
        case LOAD_ALL_USER_REQUEST:
            return {
                isLoading: true,
                users: null,
            };
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case LOAD_ALL_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                users: action.payload,
            };
        }
        case LOAD_ALL_USER_FAIL: {
            return {
                ...state,
                isLoading: false,
                users: null,
                error: action.payload,
            };
        }
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                error: null,
                user: null,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: null,
                isAuthenticated: false,
                error: null,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                err: null,
            };
        default:
            return state;
    }
};
