import axios from "axios";
import {
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAIL,
    VOTE_QUESTION_FAIL,
    VOTE_QUESTION_REQUEST,
    VOTE_QUESTION_SUCCESS,
    ADD_ANSWER_FAIL,
    ADD_ANSWER_REQUEST,
    ADD_ANSWER_SUCCESS,
    GET_ALL_QUESTION_REQUEST,
    GET_ALL_QUESTION_SUCCESS,
    GET_ALL_QUESTION_FAIL,
    CLEAR_ERROR,
} from "../constant/questionConstant";
export const createQuestion = (heading, detail, tag) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_QUESTION_REQUEST });
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            "/api/v1/question/create",
            { heading, detail, tag },
            config
        );
        dispatch({
            type: CREATE_QUESTION_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_QUESTION_FAIL,
            payload: "Question is already Voted",
        });
    }
};
export const voteQuestion =
    (question_id, user_new_status) => async (dispatch) => {
        try {
            dispatch({ type: VOTE_QUESTION_REQUEST });
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.put(
                "/api/v1/question/vote",
                { question_id, user_new_status },
                config
            );
            dispatch({
                type: VOTE_QUESTION_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: VOTE_QUESTION_FAIL,
                payload: "Question is already Voted",
            });
        }
    };

export const addAnswer = (question_id, answer) => async (dispatch) => {
    console.log("called");
    try {
        dispatch({ type: ADD_ANSWER_REQUEST });
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            "/api/v1/question/answer",
            { question_id, answer },
            config
        );
        dispatch({
            type: ADD_ANSWER_SUCCESS,
            payload: response.data.questions,
        });
    } catch (error) {
        dispatch({
            type: ADD_ANSWER_FAIL,
            payload: error.data,
        });
    }
};
export const getAllQuestion = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_QUESTION_REQUEST });
        const response = await axios.get("/api/v1/questions");
        dispatch({
            type: GET_ALL_QUESTION_SUCCESS,
            payload: response.data.message,
        });
    } catch (error) {
        dispatch({ type: GET_ALL_QUESTION_FAIL, payload: error.data });
    }
};
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
