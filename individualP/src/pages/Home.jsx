import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Home () {
    const [products, setProducts] = useState([]);

    async function fetchData (){
        try {
            // setLoading(true)
            const { data } = await axios.get(`http://localhost:3000/projects`);
            // setProducts(data.data);
            console.log(data);
            
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


    return(

        <>
        
        </>
    )
}