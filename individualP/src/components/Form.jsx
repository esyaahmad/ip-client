import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom'
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";



export default function ProductsForm({ handleSubmit, product, titleName, desc}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://mpc.kdu.ac.lk/wp-content/uploads/2022/01/Insert-Image-Here.png");
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const url = 'http://localhost:3000'


//   console.log(product);
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
    //   console.log(data.category);
      setCategories(data.category);
    } catch (error) {
        console.log(error);
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    fetchCategories()
}, [])

  return (
    <>
    <section className="m-8 flex gap-4 ml-[320px]">
        <div className="w-full lg:w-3/5 mt-0">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              {titleName}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
              {desc}
            </Typography>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={(e) => handleSubmit(e, title, description, imageUrl, categoryId)}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Title
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="name@mail.com"
                onChange={(e) => setTitle(e.target.value)} 
                value={title || ''}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Description
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="********"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <label className="label">
                <span className="text-base label-text">Category</span>
              </label>
              <select className="w-full input input-bordered input-primary" onChange={(e) => setCategoryId(e.target.value)} name="category" id="" value={categoryId}>
                <option value="">Choose</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              {/* <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Image
              </Typography>
              <input
                className="block w-full h-11 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="default_size"
                type="file"
              /> */}
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Save
            </Button>
          </form>
        </div>
        <div className="w-2/5 h-auto max-h-[660px] hidden lg:block">
          <img src="/src/assets/login.jpg" className="h-full w-full object-cover rounded-3xl" />
        </div>
      </section>

      {/* <div className="relative flex flex-col justify-center h-screen overflow-hidden m-2 p-2">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">{titleName}</h1>
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input type="text" placeholder="Enter Name" className="w-full input input-bordered" onChange={(e) => setName(e.target.value)} value={name || ''} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Description</span>
              </label>
              <input type="text" placeholder=" Enter Description" className="w-full input input-bordered" onChange={(e) => setDescription(e.target.value)} value={description || ''} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Price</span>
              </label>
              <input type="number" placeholder="Enter Price" className="w-full input input-bordered" onChange={(e) => setPrice(e.target.value)} value={price || 0} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Stock</span>
              </label>
              <input type="number" placeholder="Enter Stock" className="w-full input input-bordered" onChange={(e) => setStock(e.target.value)} value={stock ||0} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Image (URL)</span>
              </label>
              <input type="text" placeholder="Enter Image URL" className="w-full input input-bordered" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl||''} />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Category</span>
              </label>
              <select className="w-full input input-bordered input-primary" onChange={(e) => setCategoryId(e.target.value)} name="category" id="" value={categoryId}>
                <option value="">Choose</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <div>
              <button className="btn btn-block" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div> */}
      
    </>
  );
}