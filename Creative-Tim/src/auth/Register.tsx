import axios from "axios";
import { urlAccounts } from "../utils/endpoints";
import FormAuth from "./FormAuth";
import { authResponse, userCredential as userCredential } from "./auth.model";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { saveTokenLocalStorage, getClaims } from "./ManageJWT";
import AuthenticationContext from "./AuthenticationContext";
import { APIResponse } from "../utils/ApiResponse";
import { handleErrors } from "../utils/HandleErrors";
import ShowErrors from "../views/global/ShowErrors";
import showToastMessage from "../views/global/ShowSuccess";

export default function Register() {
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);

  async function register(credentials: userCredential) {
    const url_values = `${urlAccounts}/register`;
    const config_values = {
      headers: {
        "x-version": "2",
      },
    };

    try {
      const response = await axios.post<APIResponse<authResponse>>(
        url_values,
        credentials,
        config_values
      );

      if (response.data.isSuccess) {
        showToastMessage({
          title: "Registro correcto",
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
              <h3 className="text-center mb-4">Registrar</h3>
              <ShowErrors errors={errors} />
              <FormAuth
                model={{ email: "", password: "" }}
                onSubmit={async (values) => await register(values)}
                isRegister={true}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
