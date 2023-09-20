import axios from "axios";
import FormActor from "./FormActor";
import { actorCreationDTO } from "./actor.model";
import { urlActors } from "../../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ShowErrors from "../../views/global/ShowErrors";
import showToastMessage from "../../views/global/ShowSuccess";
import { handleErrors } from "../../utils/HandleErrors";

export default function CreateActor() {
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);

  async function createActor(actor: actorCreationDTO) {
    try {
      const url_values = urlActors;
      const config_values = {
        headers: {
          "x-version": "2",
          "Content-Type": "multipart/form-data", // importante si endpoint recibe "[FromForm]"
        },
      };
      await axios.post(url_values, actor, config_values);

      showToastMessage({
        title: "Creación correcta",
        icon: "success",
        callback: () => {
          navigate("/actors");
        },
      });
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  }

  return (
    <>
      <ShowErrors errors={errors} />
      <FormActor
        formName="Crear actor"
        model={{ name: "" }}
        onSubmit={async (values) => {
          await createActor(values);
        }}
      />
    </>
  );
}
