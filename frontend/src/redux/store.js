import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/authSlice.js"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,

    },
    middleware: (GetDefaultMiddleware) => {
        return GetDefaultMiddleware().concat(apiSlice.middleware)
    }
})