import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  incrementValue,
  decrementValue,
} from "./product-actions";
import { changeCurrency } from "./currencies-action";

const IS = {
  products: {
    items: [],
    currencies: "USD",
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
      return product.id === payload.id
        ? {
            ...product,
            value: product.value + payload.value,
          }
        : { ...product };
    });
  },
  [decrementValue]: (state, { payload }) => {
    return state.map((product) => {
      return product.id === payload.id
        ? {
            ...product,
            value: product.value - payload.value,
          }
        : { ...product };
    });
  },
});
const currencyReducer = createReducer(IS.products.currencies, {
  [changeCurrency]: (_, { payload }) => payload,
});

const productssReducer = combineReducers({
  items: ProductReducer,
  currencies: currencyReducer,
});

export default productssReducer;
