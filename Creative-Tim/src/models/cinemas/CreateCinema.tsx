import axios from "axios";
import FormCinema from "./FormCinema";
import { cinemaCreationDTO } from "./cinema.model";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleErrors } from "../../utils/HandleErrors";
import { urlCinemas } from "../../utils/endpoints";
import ShowErrors from "../../views/global/ShowErrors";
import showToastMessage from "../../views/global/ShowSuccess";

export default function CreateCinema() {
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);

  async function createCinema(cinema: cinemaCreationDTO) {
    try {
      const url_values = urlCinemas;
      const config_values = {
        headers: {
          "x-version": "2",
        },
      };
      await axios.post(url_values, cinema, config_values);

      showToastMessage({
        title: "Creación correcta",
        icon: "success",
        callback: () => {
          navigate("/cinemas");
        },
      });
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  }

  return (
    <>
      <ShowErrors errors={errors} />
      <FormCinema
        formName="Crear cine"
        model={{ name: "" }}
        onSubmit={async (values) => {
          await createCinema(values);
        }}
      />
    </>
  );
}
