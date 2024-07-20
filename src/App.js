import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BarChart from "./component/barchart";
import Error from "./component/Error";
import PieChart from "./component/piechart";
import ShowDataInTable from "./component/AntelopeTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShowDataInTable />,
    errorElement: <Error />,
  },
  {
    path: "/piechart",
    element: <PieChart />,
    errorElement: <Error />,
  },
  {
    path: "/barchart",
    element: <BarChart />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
