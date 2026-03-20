import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../features/userSlice";
import blogs from "../features/blogSlice";

export const store = configureStore({
  reducer: {
    app: userDetails,
    blogs: blogs
  },
});