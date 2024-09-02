import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import NotFound from './Pages/NotFound';
import Possession from './Pages/Possession';
import CreatePossession from './Components/CreatePossession';
import UpdatePossession from './Components/UpdatePossession';
import Patrimoine from './Pages/Patrimoine';

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/patrimoine"} />
  },
  {
    path: "/possession",
    element: <Possession />,
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
    element: <Patrimoine />,
    children: [
      {
        path: ":date",
        element: <Patrimoine />
      },
      {
        path: "range",
        element: <Patrimoine />
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