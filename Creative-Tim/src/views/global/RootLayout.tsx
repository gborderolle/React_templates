import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/Navbars/AdminNavbar";

import sidebarImage from "../../assets/img/sidebar-3.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import sidebarRoutes from "../../sidebarRoutes";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin";
import AuthenticationContext from "../../auth/AuthenticationContext";
import Login from "../../auth/Login";

export default function RootLayout() {
  const { claims } = useContext(AuthenticationContext); // Usa el contexto de autenticación
  const isAuthenticated = claims && claims.length > 0; // Asume que si hay 'claims', el usuario está autenticado

  const [image, setImage] = useState<string>(sidebarImage);
  const [color, setColor] = useState<string>("black");
  const [hasImage, setHasImage] = useState<boolean>(true);

  const location = useLocation();
  const mainPanel = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // sirve para navegar entre las páginas

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("ejecuta root");
      navigate("/login");
      // alert("hola");
    }

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

  return (
    <>
      {/* {isAuthenticated ? */}
      <>
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={sidebarRoutes}
        />
        <AdminNavbar />
        <FixedPlugin
          hasImage={hasImage}
          setHasImage={() => setHasImage(!hasImage)}
          color={color}
          setColor={(color: string) => setColor(color)}
          image={image}
          setImage={(image: string) => setImage(image)}
        />
        <Outlet />
      </>
      {/* :
            <Login></Login>
                null
            } */}
    </>
  );
}
