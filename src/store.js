import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import weatherReducer from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;