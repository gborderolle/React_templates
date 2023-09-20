import { useState, useEffect } from "react";
import { landingPageDTO, movieDTO } from "../../models/movies/movie.model";
import ListMovies from "../../models/movies/ListMovies";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { urlMovies } from "../../utils/endpoints";
import { handleErrors } from "../../utils/HandleErrors";
import ShowErrors from "../global/ShowErrors";

export default function LandingPage() {
  const [errors, setErrors] = useState<string[]>([]);
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const url_values = `${urlMovies}`;
    const param_values = {
      page: 1,
      recordsPerPage: 100,
    };
    axios
      .get(url_values, {
        headers: { "x-version": "2" },
        params: param_values,
      })
      .then((response: AxiosResponse) => {
        if (response.data.isSuccess && Array.isArray(response.data.result)) {
          const movies = response.data.result as movieDTO[];
          if (movies && movies.length > 0) {
            const onCinemas = movies.filter((obj) => obj.onCinema);
            const offCinemas = movies.filter((obj) => !obj.onCinema);
            setMovies({
              moviesInTheatres: onCinemas,
              moviesNextReleases: offCinemas,
            });
          }
        } else {
          console.error("Unexpected data format from the API.");
        }
      })
      .catch((error) => {
        handleErrors(error, setErrors);
      });
  }

  return (
    <>
      <ShowErrors errors={errors} />
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h3>En Cartelera</h3>
            <ListMovies movies={movies.moviesInTheatres} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h3>Próximos estrenos</h3>
            <ListMovies movies={movies.moviesNextReleases} />
          </div>
        </div>
      </div>
    </>
  );
}
