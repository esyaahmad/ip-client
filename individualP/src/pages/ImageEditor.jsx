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

    // console.log(products);


    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }
  
    
    function handleChangeImage(id) {
      navigate(`/editor/${id}`)
  }

    return( <>
    <div className='grid grid-cols-[500px_minmax(900px,_1fr)]'>
{products.map((project) => { return (
<div key={project.id} className='mt-4 ml-[420px] '>
<Card className="mt-6 mb-12 w-96 ">
      <CardHeader  className="relative h-56">
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
      <CardFooter className="pt-0 flex justify-center  ">
        {/* <Button onClick={() => handleEdit(project.id)}>Update</Button> */}
        <Button className="w-full" onClick={() => handleChangeImage(project.id)}>Edit Image</Button>


      </CardFooter>
    </Card>
</div>
    ) })}
    </div>
  </>
    )
}