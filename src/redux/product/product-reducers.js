import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  incrementValue,
  decrementValue,
} from "./product-actions";

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
  [incrementValue]: (state, { payload }) => {
    return state.map((product) => {
      return { ...product, value: product.value + payload };
    });
  },
  [decrementValue]: (state, { payload }) => {
    return state.map((product) => {
      return { ...product, value: product.value - payload };
    });
  },
});

const productssReducer = combineReducers({
  items: ProductReducer,
});

export default productssReducer;
