import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Switch cambiado por Routes
import routes from "../sidebarRoutes.js";
import AuthenticationContext from "../auth/AuthenticationContext";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";

import sidebarImage from "../assets/img/sidebar-3.jpg";

const Admin: React.FC = () => {
  const { claims } = useContext(AuthenticationContext); // Usa el contexto de autenticación
  const isAuthenticated = claims && claims.length > 0; // Asume que si hay 'claims', el usuario está autenticado

  const location = useLocation();
  const mainPanel = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<string>(sidebarImage);
  const [color, setColor] = useState<string>("black");
  const [hasImage, setHasImage] = useState<boolean>(true);

  const getRoutes = (routes: RouteItem[]) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            key={key}
            path={prop.path}
            element={React.createElement(prop.component)}
          />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;
    if (mainPanel.current) {
      mainPanel.current.scrollTop = 0;
    }

    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      let element = document.getElementById("bodyClick");
      if (element) {
        element.parentNode!.removeChild(element);
      }
    }
  }, [location]);

  // Admin es el Layout general
  // Los componentes los carga con getRoutes()
  return (
    <>
      {isAuthenticated &&
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={routes}
        />
      }
      {isAuthenticated && <AdminNavbar />}
      <Routes>{getRoutes(routes)}</Routes>
    </>
  );
};

export default Admin;

interface RouteItem {
  layout: string;
  path: string;
  component: React.ElementType;
  // Otras propiedades que puedan tener tus rutas
}
