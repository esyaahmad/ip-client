import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../components/Form";

export default function edit() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = 'http://localhost:3000'


  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${url}/projects/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    });
        // console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleSubmit(event, title, description, imageUrl ,categoryId) {
    event.preventDefault();
    try {
      const edited = { title, description, categoryId: +categoryId };
      console.log(edited)

      await axios.put(`${url}/projects/${id}`, edited, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Success Edited",
        icon: "success",
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
      <Form handleSubmit={handleSubmit} product={product} titleName={'Edit Your Project'} desc={'Enter your project detail.'} img={'/src/assets/OPE (1).png'}/>
    </>
  );
}
