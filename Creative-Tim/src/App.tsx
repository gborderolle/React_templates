// Configurar ruteo
// Clase 63: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25858262#overview

import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import setupValidations from "./Validations";
import { useEffect, useRef, useState } from "react";
import { claim } from "./auth/auth.model";
import AuthenticationContext from "./auth/AuthenticationContext";
import { getClaims } from "./auth/ManageJWT";
import { setupInterceptor } from "./utils/Interceptors";
import React from "react";
import paths from "./route-config";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/css/global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminNavbar from "./components/Navbars/AdminNavbar";
import Footer from "./utils/Footer";
import FixedPlugin from "./components/FixedPlugin/FixedPlugin";
import routes from "./sidebarRoutes";

import sidebarImage from "./assets/img/sidebar-3.jpg";
import LandingPage from "./views/landing/LandingPage";
import Dashboard from "./views/Dashboard";
import IndexReviews from "./models/reviews/IndexReviews";
import IndexMovies from "./models/movies/IndexMovies";
import IndexGenres from "./models/genres/IndexGenres";
import IndexCinemas from "./models/cinemas/IndexCinemas";
import IndexActors from "./models/actors/IndexActors";
import RootLayout from "./views/global/RootLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";

setupValidations();
setupInterceptor();

function App() {
  const [image, setImage] = useState<string>(sidebarImage);
  const [color, setColor] = useState<string>("black");
  const [hasImage, setHasImage] = useState<boolean>(true);
  const mainPanel = useRef<HTMLDivElement>(null);

  const [claims, setClaims] = useState<claim[]>([
    // { name: "email", value: "felipe@hotmail.com" },
    // { name: "role", value: "admin" },
  ]);

  const router = createBrowserRouter([
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "landing", element: <LandingPage /> },
        { path: "actors", element: <IndexActors /> },
        { path: "cinemas", element: <IndexCinemas /> },
        { path: "genres", element: <IndexGenres /> },
        { path: "movies", element: <IndexMovies /> },
        { path: "reviews", element: <IndexReviews /> },

        { index: true, element: <Dashboard /> },
        { path: "*", element: <Dashboard /> },
      ],
    },
  ]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  function update(claims: claim[]) {
    setClaims(claims);
  }

  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
