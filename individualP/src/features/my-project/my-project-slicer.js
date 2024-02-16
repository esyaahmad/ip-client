import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  myProject: [],
  loading: false,
  error: "",
};

export const myProjectSlice = createSlice({
  name: "myProject",

  initialState,

  reducers: {
    fetchPending(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.myProject = action.payload;
    },
    fetchReject(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = myProjectSlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const { data } = await axios.get(`http://localhost:3000/projects-user`, { headers: { Authorization: `Bearer ${localStorage.access_token}` } });
    console.log(data);
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchReject(error.message));
    Swal.fire({
      icon: "error",
      title: error.message,
    });
  }
};

export default myProjectSlice.reducer;
