

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";


   // user: userReducer,
    // other: otherReducer,
    // product: productReducer,
    // cart: cartReducer,

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

// export const server = "https://ecommerce-server-i8ns.onrender.com/api/v1";
// export const server = 'http://10.0.2.2:9090/api/v1';
export const server = 'http://13.201.113.247:9090/api/v1';