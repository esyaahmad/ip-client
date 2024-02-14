import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";

export default function Add() {
    const navigate = useNavigate()
    const url = 'http://localhost:3000'

    async function handleSubmit(event, title, description, imageUrl, categoryId) {
        event.preventDefault()
        try {
            const added = { title, description, imageUrl: "https://mpc.kdu.ac.lk/wp-content/uploads/2022/01/Insert-Image-Here.png", categoryId: +categoryId }
  
            const { data } = await axios.post(`${url}/projects`, added, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
          //   console.log(data);
          Swal.fire({
              title: 'Success Add New Cuisine',
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            });
            navigate('/')
        } catch (error) {
          console.log(error);
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }
    }
  return (
    <>
      <Form handleSubmit={handleSubmit} titleName={'Add New Project'} desc={'Enter your project detail.'}/>
      

      {/* <div className="relative flex flex-col justify-center h-screen overflow-hidden">
  <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
    <h1 className="text-3xl font-semibold text-center text-gray-700">
      Login
    </h1>
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <label className="label">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Email Address"
          className="w-full input input-bordered"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full input input-bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to='/register'>
      <p
        className="text-xs text-gray-600 hover:underline hover:text-blue-600"
      >
        Create Account Here
      </p>
      </Link>
     
      <div>
        <button className="btn btn-block">Login</button>
      </div>
    </form>
  </div>
</div> */}
    </>
  );
}
