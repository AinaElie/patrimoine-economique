import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './Pages/NotFound';
import Menu from './Pages/Menu'
import Possession from './Pages/Possession';
import Patrimoine from './Pages/Patrimoine';
import CreatePossession from './Components/CreatePossession';

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Menu/>
  },
  {
    path: "/possession",
    element: <Possession/>
  },
  {
    path: "possession/create",
    element: <CreatePossession/>
  },
  {
    path: "/patrimoine",
    element: <Patrimoine/>
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