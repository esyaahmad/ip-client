import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";

export default function Add() {
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  async function handleSubmit(event, title, description, imageUrl, categoryId) {
    event.preventDefault();
    try {
      const added = { title, description, imageUrl: "https://mpc.kdu.ac.lk/wp-content/uploads/2022/01/Insert-Image-Here.png", categoryId: +categoryId };

      const { data } = await axios.post(`${url}/projects`, added, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      //   console.log(data);
      Swal.fire({
        title: "Success Add New Cuisine",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }
  return (
    <>
      <Form handleSubmit={handleSubmit} titleName={"Add New Project"} desc={"Enter your project detail."} img={"/assets/OPE.png"} />
    </>
  );
}
