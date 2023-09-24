import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./featrues/productSlice";
import {  combineReducers } from "redux";



const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const reducer = combineReducers({
  app: productSlice,

})


export const store = configureStore(
  {
    reducer: reducer,
    middleware: customizedMiddleware
  }
)