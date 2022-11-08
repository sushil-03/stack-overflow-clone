import {
    CREATE_QUESTION_FAIL,
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    ADD_ANSWER_FAIL,
    ADD_ANSWER_REQUEST,
    ADD_ANSWER_SUCCESS,
    VOTE_QUESTION_FAIL,
    VOTE_QUESTION_REQUEST,
    VOTE_QUESTION_SUCCESS,
    GET_ALL_QUESTION_REQUEST,
    GET_ALL_QUESTION_SUCCESS,
    GET_ALL_QUESTION_FAIL,
    CLEAR_ERROR,
} from "../constant/questionConstant";
export const questionReducer = (
    state = {
        isLoading: false,
        questions: null,
        error: null,
        question: null,
        votes: 0,
        isAdded: false,
    },
    action
) => {
    switch (action.type) {
        case CREATE_QUESTION_REQUEST:
        case GET_ALL_QUESTION_REQUEST: {
            return {
                ...state,
                isLoading: true,
                questions: null,
                error: null,
                isAdded: false,
            };
        }
        case VOTE_QUESTION_REQUEST:
        case ADD_ANSWER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_ALL_QUESTION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                questions: action.payload,
            };
        }
        case ADD_ANSWER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isAdded: true,
                questions: action.payload,
            };
        }
        case CREATE_QUESTION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isAdded: true,
            };
        }
        case VOTE_QUESTION_SUCCESS: {
            return {
                ...state,
                votes: action.payload.votes,
                isLoading: false,
            };
        }
        case GET_ALL_QUESTION_FAIL: {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        }

        case ADD_ANSWER_FAIL:
        case CREATE_QUESTION_FAIL:
        case VOTE_QUESTION_FAIL: {
            return {
                ...state,
                isLoading: false,
                isAdded: false,
                error: action.payload,
            };
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                isAdded: false,
                error: null,
            };
        }
        default:
            return state;
    }
};
