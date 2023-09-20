import axios from "axios";
import Button from "../utils/Button";
import { urlAccounts } from "../utils/endpoints";
import { userDTO } from "./auth.model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "../utils/HandleErrors";
import IndexEntity from "../views/global/IndexEntity";
import showConfirm from "../views/global/ShowConfirm";
import ShowErrors from "../views/global/ShowErrors";
import showToastMessage from "../views/global/ShowSuccess";

export default function IndexUsers() {
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);

  async function makeAdmin(id: string) {
    await editAdmin(`${urlAccounts}/makeAdmin`, id);
  }

  async function removeAdmin(id: string) {
    await editAdmin(`${urlAccounts}/removeAdmin`, id);
  }

  async function editAdmin(url: string, id: string) {
    try {
      const url_values = url;
      const config_values = {
        headers: {
          "x-version": "2",
          "Content-Type": "application/json",
        },
      };
      await axios.post(url_values, JSON.stringify(id), config_values);

      showToastMessage({
        title: "Creación correcta",
        icon: "success",
        callback: () => {
          navigate("/");
        },
      });
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  }

  return (
    <>
      <ShowErrors errors={errors} />
      <IndexEntity<userDTO> // Asegúrate de que 'UserDTO' esté importado o definido en tu archivo
        url={`${urlAccounts}/listUsers`}
        title="Usuarios"
      >
        {(users) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() =>
                        showConfirm(
                          () => makeAdmin(user.id),
                          `¿Desea hacer a ${user.email} admin?`,
                          "Realizar"
                        )
                      }
                    >
                      Hacer Admin
                    </Button>
                    <Button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        showConfirm(
                          () => removeAdmin(user.id),
                          `¿Desea remover a ${user.email} como admin?`,
                          "Realizar"
                        )
                      }
                    >
                      Remover Admin
                    </Button>
                  </td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
