import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

 
export default function DefaultSidebar() {
  const navigate = useNavigate()

  async function handleLogout() {
    localStorage.clear()
    Swal.fire({
        icon: "success",
        title: `Logged Out`
    })
    navigate('/login')
}
  return (
    <aside className="fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">


    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          <Link to="/">
          <button>Sidebar</button>
          </Link>
        </Typography>
      </div>
      <List>
          <Link to="/">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button>My Project</button>
        </ListItem>
          </Link>
          <Link to="/add">
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button>Add Project</button>
        </ListItem>
          </Link>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          {/* <Link to="/wallpaper"> */}

           <button onClick={(e) => navigate('/wallpaper')}>Wallpaper Generator</button>
          {/* </Link> */}

        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={handleLogout}>Log Out</button>
          
        </ListItem>
      </List>
    </Card>
    </aside>

  );
}