import { configureStore } from "@reduxjs/toolkit";
import myProject from "../features/my-project/my-project-slicer";

export default configureStore({
  reducer: {
    myProject,
  },
});
