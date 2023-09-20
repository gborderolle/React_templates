// Clase 152: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/26118756#notes

import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizedProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { claims } = useContext(AuthenticationContext);

  useEffect(() => {
    // Cada vez que se actualizan los claims se determina si cumple con el rol del parámetro (props.role)
    if (props.role) {
      const index = claims.findIndex(
        (claim) => claim.name === "role" && claim.value === props.role
      );
      setIsAuthorized(index > -1);
    } else {
      setIsAuthorized(claims.length > 0); // Determina si el usuario está autenticado (logueado)
    }
  }, [claims, props.role]); // Se ejecuta cuando cambia claims o props.role

  return <>{isAuthorized ? props.authorized : props.unauthorized}</>;
}

interface authorizedProps {
  authorized: ReactElement;
  unauthorized?: ReactElement;
  role?: string;
}
