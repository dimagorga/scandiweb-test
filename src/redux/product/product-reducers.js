import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { addProduct, removeProduct } from "./product-actions";

const IS = {
  products: {
    items: [],
  },
};

const ProductReducer = createReducer(IS.products.items, {
  [addProduct]: (state, { payload }) => {
    return [...state, payload];
  },
  [removeProduct]: (state, { payload }) => {
    return state.filter((product) => product.id !== payload);
  },
});

const productssReducer = combineReducers({
  items: ProductReducer,
});

export default productssReducer;
