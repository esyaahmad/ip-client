import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

export default function Home () {
    const [products, setProducts] = useState([]);
  const navigate = useNavigate()


    async function fetchData (){
        try {
            // setLoading(true)
            const { data } = await axios.get(`http://localhost:3000/projects-user`, {headers: {Authorization: `Bearer ${localStorage.access_token}`}});
            setProducts(data);
            // console.log(data);
            console.log(products);
        } catch (error) {
            console.log(error); 
            Swal.fire({
              title: error.response.status,
              icon: 'error',
          });
        }
    }

    useEffect(() => {
        console.log('ini proses mounted, hanya dijalankan 1x di awal');
        fetchData();
    }, [])

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:3000/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
    
            Swal.fire({
                title: 'Delete success',
                icon: "success"
            });
    
            fetchData()
        } catch (error) {
            Swal.fire({
                title: error.response.data.error,
                icon: "error"
            });
        }
    }

    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }
  
    
    function handleChangeImage(id) {
      navigate(`/patch/${id}`)
  }

    return( <>
    <div className='grid grid-cols-[500px_minmax(900px,_1fr)]'>
{products.map((project) => { return (
<div className='mt-12 ml-[320px] '>
<Card className="mt-6 w-96 ">
      <CardHeader color='rgba(255, 255, 255, .4)' className="relative h-56">
        <img className=' '
          src={project.imageUrl}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {project.title}
        </Typography>
        <Typography>
          {project.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between  ">
        <Button onClick={() => handleEdit(project.id)}>Update</Button>
        <Button onClick={() => handleChangeImage(project.id)}>ChangeImage</Button>

        <Button onClick={() => handleDelete(project.id)}>Delete</Button>

      </CardFooter>
    </Card>
</div>
    ) })}
    </div>
  </>
    )
}