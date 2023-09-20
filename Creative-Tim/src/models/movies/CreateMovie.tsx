import axios, { AxiosResponse } from "axios";
import FormMovie from "./FormMovie";
import { movieCreationDTO, moviesPostGetDTO } from "./movie.model";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { genreDTO } from "../genres/genre.model";
import { cinemaDTO } from "../cinemas/cinema.model";
import { APIResponse, ResponseId } from "../../utils/ApiResponse";
import { handleErrors } from "../../utils/HandleErrors";
import { urlMovies } from "../../utils/endpoints";
import Loading from "../../views/global/Loading";
import ShowErrors from "../../views/global/ShowErrors";
import showToastMessage from "../../views/global/ShowSuccess";
import { ConvertMovieToFormData } from "../actors/FormDataUtils";

export default function CreateMovie() {
  const navigate = useNavigate(); // sirve para navegar entre las páginas
  const [errors, setErrors] = useState<string[]>([]);

  const [noSelectedGenres, setNoSelectedGenres] = useState<genreDTO[]>([]);
  const [noSelectedCinemas, setNoSelectedCinemas] = useState<cinemaDTO[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function createMovie(movie: movieCreationDTO) {
    try {
      const url_values = urlMovies;
      const formData = ConvertMovieToFormData(movie);
      const config_values = {
        headers: {
          "x-version": "2",
          "Content-Type": "multipart/form-data", // importante si endpoint recibe "[FromForm]"
        },
      };
      const response = await axios.post<APIResponse<ResponseId>>(
        url_values,
        formData,
        config_values
      );

      if (response.data.isSuccess) {
        showToastMessage({
          title: "Creación correcta",
          icon: "success",
          callback: () => {
            navigate(`/movies/${response.data.result.id}`);
            setLoaded(true);
          },
        });
      } else {
        setErrors(response.data.errorMessages);
      }
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  }

  useEffect(() => {
    const url_values = `${urlMovies}/postget`;
    const param_values = {};
    axios
      .get(url_values, {
        headers: { "x-version": "2" },
        params: param_values,
      })
      .then((response: AxiosResponse<moviesPostGetDTO>) => {
        setNoSelectedGenres(response.data.result.genres);
        setNoSelectedCinemas(response.data.result.cinemas);
        setLoaded(true);
      })
      .catch((error: any) => {
        handleErrors(error, setErrors);
      });
  }, []);

  return (
    <>
      <ShowErrors errors={errors} />
      {loaded ? (
        <FormMovie
          formName="Crear película"
          model={{ title: "", onCinema: true }}
          onSubmit={async (values) => {
            await createMovie(values);
          }}
          selectedGenres={[]}
          noSelectedGenres={noSelectedGenres} //
          selectedCinemas={[]}
          noSelectedCinemas={noSelectedCinemas} //
          selectedActors={[]}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
