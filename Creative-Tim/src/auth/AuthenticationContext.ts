import React from "react";
import { claim } from "./auth.model";

const AuthenticationContext = React.createContext<{
  claims: claim[];
  update(claims: claim[]): void; // Cuando el user se loguea actualiza el estado y se replica en toda la app
}>({ claims: [], update: () => {} });

export default AuthenticationContext;
