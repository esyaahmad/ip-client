import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchAsync } from "../features/my-project/my-project-slicer";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

export default function Home() {
  //data dari redux global state
  const navigate = useNavigate()

  const { myProject, loading, error } = useSelector((state) => state.myProject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  // console.log(myProject);

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  function handleChangeImage(id) {
    navigate(`/editor/${id}`);
  }

  return (
    <>
      <div className="grid grid-cols-[500px_minmax(900px,_1fr)]">
        {myProject.map((project) => {
          return (
            <div key={project.id} className="mt-4 ml-[420px] ">
              <Card className="mt-6 mb-12 w-96 ">
                <CardHeader className="relative h-56">
                  <img className=" " src={project.imageUrl} alt="card-image" />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {project.title}
                  </Typography>
                  <Typography>{project.description}</Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-center  ">
                  {/* <Button onClick={() => handleEdit(project.id)}>Update</Button> */}
                  <Button className="w-full" onClick={() => handleChangeImage(project.id)}>
                    Edit Image
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
