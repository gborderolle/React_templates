import axios, { AxiosResponse, isAxiosError } from "axios";
import FormMovie from "./FormMovie";
import { movieCreationDTO, movieDTO, moviePutGetDTO } from "./movie.model";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { handleErrors } from "../../utils/HandleErrors";
import { urlMovies } from "../../utils/endpoints";
import Loading from "../../views/global/Loading";
import ShowErrors from "../../views/global/ShowErrors";
import { ConvertMovieToFormData } from "../actors/FormDataUtils";

export default function EditMovie() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [errors, setErrors] = useState<string[]>([]);

  const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
  const [movie, setMovie] = useState<movieCreationDTO>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url_values = `${urlMovies}/putget/${id}`;
        const param_values = {};
        const response: AxiosResponse<moviePutGetDTO> = await axios.get(
          url_values,
          {
            headers: { "x-version": "2" },
            params: param_values,
          }
        );
        if (response && response.data) {
          const { movie } = response.data;
          const model: movieCreationDTO = {
            title: movie.title,
            onCinema: movie.onCinema,
            trailer: movie.trailer,
            posterURL: movie.posterURL,
            description: movie.description,
            premiere: moment(movie.premiere).toDate(),
          };

          setMovie(model);
          setMoviePutGet(response.data);
        } else {
          throw new Error("Formato de datos inesperado de la API.");
        }
      } catch (error: any) {
        handleErrors(error, setErrors);
      }
    };

    fetchData();
  }, [id]);

  const editMovie = async (editMovie: movieCreationDTO) => {
    try {
      const url_values = `${urlMovies}/${id}`;
      const formData = ConvertMovieToFormData(editMovie);
      await axios.put<ApiResponse<any>>(url_values, formData, {
        headers: {
          "x-version": "2",
          "Content-Type": "multipart/form-data", // importante si endpoint recibe "[FromForm]"
        },
      });
      navigate("/movies");
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  };

  return (
    <>
      <ShowErrors errors={errors}></ShowErrors>
      {movie && moviePutGet ? (
        <FormMovie
          formName="Modificar película"
          noSelectedGenres={moviePutGet.noSelectedGenres}
          selectedGenres={moviePutGet.selectedGenres}
          noSelectedCinemas={moviePutGet.noSelectedCinemas}
          selectedCinemas={moviePutGet.selectedCinemas}
          selectedActors={moviePutGet.actorMovieDTO || []}
          model={movie}
          onSubmit={async (values) => await editMovie(values)}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
}
