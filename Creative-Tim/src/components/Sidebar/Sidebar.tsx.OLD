import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import "./Sidebar.css";

export default function Sidebar({ color, image, routes }: SidebarProps) {
  const location = useLocation();

  const activeRoute = (routeName: any) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const isActive = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1;
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("../../assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Dashboard
          </a>
        </div>
        <Nav>
          {routes.map((prop: any, key: string) => {
            if (!prop.redirect)
              return (
                // ToDo: control de auth
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : // <NavLink to={prop.layout + prop.path} className="nav-link">
                      isActive(prop.path)
                      ? "active"
                      : ""
                  }
                  key={key}
                >
                  {/* <NavLink to={prop.layout + prop.path} className="nav-link"> */}
                  <NavLink to={prop.path} className="nav-link hover-effect">
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

interface SidebarProps {
  color: string;
  image: string;
  routes: any; // Puedes definir esto de manera más precisa si conoces la estructura de 'routes'
}
