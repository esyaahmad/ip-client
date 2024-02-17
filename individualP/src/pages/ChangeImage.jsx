import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function patchImage() {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const url = "https://server.esyaahmad.tech";

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${url}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
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

  async function handlePatchImage(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", image);
      await axios.patch(`${url}/projects/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Success Change Image",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }
  return (
    <>
      <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden ">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-white">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">Change Image</h1>
          <img src={product.imgUrl} alt="" />

          <form className="space-y-4" onSubmit={handlePatchImage}>
            <div>
              <label className="label">
                <span className="text-base label-text">Select File</span>
              </label>
              <input
                type="file"
                className="w-full input input-bordered input-accent"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div>
              <button type="submit" className="btn btn-accent">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
