import {createBrowserRouter, redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import Home from '../pages/Home'


const router = createBrowserRouter([
{
    path: "/",
    element: <Home />,
}


])
export default router
