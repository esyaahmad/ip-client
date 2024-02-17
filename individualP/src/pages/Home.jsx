import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchAsync } from "../features/my-project/my-project-slicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

export default function Home() {
  const url = "https://server.esyaahmad.tech";

  //contoh singkatnya redux ada di src/pages/ImageEditor.jsx

  //   const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  //   async function fetchData (){
  //       try {
  //           // setLoading(true)
  //           const { data } = await axios.get(`http://localhost:3000/projects-user`, {headers: {Authorization: `Bearer ${localStorage.access_token}`}});
  //           setProducts(data);
  //           // console.log(data);
  //           console.log(products);
  //       } catch (error) {
  //           console.log(error);
  //           Swal.fire({
  //             title: error.response.status,
  //             icon: 'error',
  //         });
  //       }
  //   }

  //   useEffect(() => {
  //       console.log('ini proses mounted, hanya dijalankan 1x di awal');
  //       fetchData();
  //   }, [])

  const { myProject, loading, error } = useSelector((state) => state.myProject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  console.log(myProject);

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Delete success",
        icon: "success",
      });

      dispatch(fetchAsync())
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        icon: "error",
      });
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  function handleChangeImage(id) {
    navigate(`/patch/${id}`);
  }

  return (
    <>
      <div className="grid grid-cols-[500px_minmax(900px,_1fr)] ">
        {myProject.length === 0 ? (
          <a href="/add">
            <img src="/assets/first-project.png" alt="" className="mt-6 ml-96 rounded-xl border-2 border-gray-300" />
          </a>
        ) : (
          ""
        )}
        {myProject.map((project) => {
          return (
            <div className="mt-8 ml-52 md:mt-4 md:ml-[420px] ">
              <Card className="mt-6 mb-12 w-96 ">
                <button onClick={() => handleChangeImage(project.id)}>
                  <CardHeader color="rgba(255, 255, 255, .4)" className="relative h-56">
                    <img className=" " src={project.imageUrl} alt="card-image" />
                  </CardHeader>
                </button>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {project.title}
                  </Typography>
                  <Typography>{project.description}</Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between  ">
                  <Button onClick={() => handleEdit(project.id)}>Update</Button>
                  <Button onClick={() => handleChangeImage(project.id)}>Change Image</Button>

                  <Button onClick={() => handleDelete(project.id)}>Delete</Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
