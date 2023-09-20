import axios from "axios";
import FormGenre from "./FormGenre";
import { genreCreationDTO } from "./genre.model";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleErrors } from "../../utils/HandleErrors";
import { urlGenres } from "../../utils/endpoints";
import ShowErrors from "../../views/global/ShowErrors";
import showToastMessage from "../../views/global/ShowSuccess";

export default function CreateGenre() {
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);

  async function createGenre(genre: genreCreationDTO) {
    try {
      const url_values = urlGenres;
      const config_values = {
        headers: {
          "x-version": "2",
        },
      };
      await axios.post(url_values, genre, config_values);

      showToastMessage({
        title: "Creación correcta",
        icon: "success",
        callback: () => {
          navigate("/genres");
        },
      });
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  }

  return (
    <>
      <ShowErrors errors={errors} />
      <FormGenre
        formName="Crear género"
        model={{ name: "" }}
        onSubmit={async (values) => {
          await createGenre(values);
        }}
      />
    </>
  );
}
