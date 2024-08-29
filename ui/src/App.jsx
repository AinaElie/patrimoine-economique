import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import NotFound from './Pages/NotFound';
import Menu from './Pages/Menu'
import Possession from './Pages/Possession';
// import Patrimoine from './Pages/Patrimoine';
import CreatePossession from './Components/CreatePossession';
import UpdatePossession from './Components/UpdatePossession';

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/patrimoine"} />
  },
  {
    path: "/possession",
    element: <Menu />,
    children: [
      {
        path: ":libelle/close",
        element: <Possession />
      },
    ]
  },
  {
    path: "possession/create",
    element: <CreatePossession />
  },
  {
    path: "possession/:libelle/update",
    element: <UpdatePossession />
  },
  {
    path: "/patrimoine",
    element: <Menu />,
    children: [
      {
        path: ":date",
        element: <Menu />
      },
      {
        path: "range",
        element: <Menu />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  )
}