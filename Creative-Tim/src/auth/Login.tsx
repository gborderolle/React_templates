import { authResponse, userCredential } from "./auth.model";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../utils/endpoints";
import { getClaims, saveTokenLocalStorage } from "./ManageJWT";
import AuthenticationContext from "./AuthenticationContext";
import { handleErrors } from "../utils/HandleErrors";
import Loading from "../views/global/Loading";
import ShowErrors from "../views/global/ShowErrors";
import showToastMessage from "../views/global/ShowSuccess";
import { APIResponse } from "../utils/ApiResponse";
import FormAuth from "./FormAuth";

export default function Login() {
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Nuevo estado para manejar la carga

  async function login(credentials: userCredential) {
    setIsLoading(true); // Activar el estado de carga

    try {
      const url_values = `${urlAccounts}/login`;
      const config_values = {
        headers: {
          "x-version": "2",
        },
      };
      const response = await axios.post<APIResponse<authResponse>>(
        url_values,
        credentials,
        config_values
      );
      if (response.data.isSuccess) {
        showToastMessage({
          title: "Login correcto",
          icon: "success",
          callback: () => {
            saveTokenLocalStorage(response.data.result);
            update(getClaims());
            navigate("/");
          },
        });
      } else {
        setErrors(response.data.errorMessages);
      }
    } catch (error: any) {
      handleErrors(error, setErrors);
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            {/* Sección de la portada */}
            <div className="card-img-top">
              <img
                src="https://e1.pxfuel.com/desktop-wallpaper/574/383/desktop-wallpaper-movie-poster-mix-of-movies.jpg"
                alt="Cover"
                className="img-fluid"
                style={{ objectFit: "cover", height: "200px", width: "100%" }}
              />
            </div>

            {/* Sección del formulario de inicio de sesión */}
            <div className="card-body">
              <h3 className="text-center mb-4">Iniciar sesión</h3>
              <ShowErrors errors={errors} />
              <FormAuth
                model={{ email: "", password: "" }}
                onSubmit={async (values) => await login(values)}
              />
              {isLoading ? <Loading /> : null}
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
