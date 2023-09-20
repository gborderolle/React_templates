import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AuthenticationContext from "./auth/AuthenticationContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "./layouts/Admin";

ReactDOM.render(
  <BrowserRouter>
    {/* AuthenticationContext.Provider: Para que toda la app tenga acceso al estado de claims */}
    {/* <AuthenticationContext.Provider value={{ claims, update }}> */}
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
    {/* </AuthenticationContext.Provider> */}
  </BrowserRouter>,
  document.getElementById("root")
);
