import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./featrues/productSlice";

export const store = configureStore({
    reducer: {
        app: productSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})