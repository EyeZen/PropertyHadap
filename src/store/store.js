import { configureStore } from "@reduxjs/toolkit";
import { gameBoardReducers } from "./slices/gameBoardSlice";


const store = configureStore({
    reducer: {
        gameboard: gameBoardReducers
    }
});

export default store;