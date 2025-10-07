// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from "./buttonSlice.js";
import videoReducer from "./videoSlice";

export const store = configureStore({
    reducer: {
        button: buttonReducer,
        videos: videoReducer,

    },
});
