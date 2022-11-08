import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { questionReducer } from "./reducers/questionReducer";
const root = ReactDOM.createRoot(document.getElementById("root"));

const rootReducer = combineReducers({
    user: userReducer,
    question: questionReducer,
});
const store = configureStore({
    reducer: rootReducer,
});
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
