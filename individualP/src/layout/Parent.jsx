import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav"

export default function Parent () {
    return (
        <>
        <Sidenav/>
        <Outlet/>
        </>
    )
}