import HomePage from '@features/login/Login';
import Dashboard from '@features/dashboard/Dashboard';
import User from '@features/user/User';
import Kandang from '@features/kandang';
import Monitoring from '@features/monitoring';
import Sensor from '@features/sensor';
import { createBrowserRouter } from "react-router-dom";

const routerList = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "kandang",
    element: <Kandang />,
  },
  {
    path: "monitoring",
    element: <Monitoring />,
  },
  {
    path: "sensor",
    element: <Sensor />,
  },
]);

export default routerList;