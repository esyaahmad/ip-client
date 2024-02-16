import { createBrowserRouter, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import ChangeImage from "../pages/ChangeImage";
import ImageGenerator from "../pages/ImageGenerator";
import ImageEditor from "../pages/ImageEditor";
import Editor from "../pages/Editor";
import Credit from "../pages/Credit";
import Sidenav from "../components/Sidenav";
import Parent from "../layout/Parent";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        Swal.fire({
          icon: "warning",
          title: `You are Already Logged In`,
        });
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <Parent />,
    loader: () => {
      if (!localStorage.access_token) {
        Swal.fire({
          icon: "error",
          title: `Login First`,
        });
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/patch/:id",
        element: <ChangeImage />,
      },
      {
        path: "/wallpaper",
        element: <ImageGenerator />,
      },
      {
        path: "/editor",
        element: <ImageEditor />,
      },
      {
        path: "/editor/:id",
        element: <Editor />,
      },
      {
        path: "/credit",
        element: <Credit />,
      },
    ],
  },
]);
export default router;
