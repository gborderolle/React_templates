import Dashboard from "./views/Dashboard";
import Landing from "./views/landing/LandingPage";
import IndexGenres from "./models/genres/IndexGenres";
import IndexMovies from "./models/movies/IndexMovies";
import IndexActors from "./models/actors/IndexActors";
import IndexCinemas from "./models/cinemas/IndexCinemas";
import IndexReviews from "./models/reviews/IndexReviews";
import FilterMovies from "./models/movies/FilterMovies";
import IndexUsers from "./auth/IndexUsers";

import UserProfile from "./views/UserProfile";
import TableList from "./views/TableList";
import Typography from "./views/Typography";
import Icons from "./views/Icons";
import Maps from "./views/Maps";
import Notifications from "./views/Notifications";

const sidebarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "",
  },
  {
    path: "/landing",
    name: "Cartelera",
    icon: "nc-icon nc-button-play",
    component: Landing,
    layout: "",
  },
  {
    path: "/genres",
    name: "Géneros",
    icon: "nc-icon nc-tag-content",
    component: IndexGenres,
    layout: "",
  },
  {
    path: "/movies",
    name: "Películas",
    icon: "nc-icon nc-bullet-list-67",
    component: IndexMovies,
    layout: "",
  },
  {
    path: "/actors",
    name: "Actores",
    icon: "nc-icon nc-circle-09",
    component: IndexActors,
    layout: "",
  },
  {
    path: "/cinemas",
    name: "Cines",
    icon: "nc-icon nc-atom",
    component: IndexCinemas,
    layout: "",
  },
  {
    path: "/reviews",
    name: "Reviews",
    icon: "nc-icon nc-notes",
    component: IndexReviews,
    layout: "",
  },
  {
    path: "/movies/filter",
    name: "Filtrar películas",
    icon: "nc-icon nc-zoom-split",
    component: FilterMovies,
    layout: "",
  },
  {
    path: "/users",
    name: "Administración",
    icon: "nc-icon nc-settings-90",
    component: IndexUsers,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-simple-add",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-simple-add",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-simple-add",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-simple-add",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-simple-add",
  //   component: Maps,
  //   layout: "",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-simple-add",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default sidebarRoutes;
