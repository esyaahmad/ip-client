import {createBrowserRouter, redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Sidenav from '../../components/sidenav'


const router = createBrowserRouter([
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>,
        loader: () => {
            if(localStorage.access_token) {
                Swal.fire({
                    icon: "warning",
                    title: `You are Already Logged In`
                })
                return redirect('/')
            }
            return null
        }
    },
    {
        path:'/',
    element: <Sidenav />
}


])
export default router
