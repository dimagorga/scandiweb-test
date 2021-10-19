import { createAction } from "@reduxjs/toolkit";

export const addProduct = createAction("products/addProduct");
export const removeProduct = createAction("products/removeProduct");

export const incrementValue = createAction("products/increment");
export const decrementValue = createAction("products/decrement");
