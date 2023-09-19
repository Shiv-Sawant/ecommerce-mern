import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./featrues/productSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers } from "redux";


const middleware = [thunk]

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