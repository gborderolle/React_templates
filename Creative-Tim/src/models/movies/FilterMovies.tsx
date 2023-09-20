import { Field, Form, Formik } from "formik";
import { genreDTO } from "../genres/genre.model";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { movieDTO } from "./movie.model";
import ListMovies from "./ListMovies";
import { useLocation, useNavigate } from "react-router-dom";
import { urlGenres, urlMovies } from "../../utils/endpoints";
import { handleErrors } from "../../utils/HandleErrors";
import ShowErrors from "../../views/global/ShowErrors";
import Button from "../../utils/Button";
import Pagination from "../../utils/Pagination";

export default function FilterMovies() {
  const [errors, setErrors] = useState<string[]>([]);
  const [genres, setGenres] = useState<genreDTO[]>([]);
  const [movies, setMovies] = useState<movieDTO[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); // useNavigate(): sirve para navegar entre las páginas
  const query = new URLSearchParams(useLocation().search); // URLSearchParams(): para acceder a los querystrings

  const initialValues: filterMoviesForm = {
    title: "",
    genreId: 0,
    nextPremiere: false,
    onCinema: false,
    page: 1,
    recordsPerPage: 10,
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url_values = `${urlGenres}/all`;
        const param_values = {
          page,
          recordsPerPage,
        };
        const response: AxiosResponse<ApiResponse<any>> = await axios.get(
          url_values,
          {
            headers: { "x-version": "2" },
            params: param_values,
          }
        );
        if (response && response.data && response.data.result) {
          setGenres(response.data.result);
        } else {
          throw new Error("Formato de datos inesperado de la API.");
        }
      } catch (error: any) {
        handleErrors(error, setErrors);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (query.get("title")) {
      // get(): obtiene el qs de la URL
      initialValues.title = query.get("title")!; // !: asegura que no va a ser NULL
    }
    if (query.get("genreId")) {
      initialValues.genreId = parseInt(query.get("genreId")!, 10);
    }
    if (query.get("nextPremiere")) {
      initialValues.nextPremiere = true;
    }
    if (query.get("onCinema")) {
      initialValues.onCinema = true;
    }
    if (query.get("page")) {
      initialValues.page = parseInt(query.get("page")!, 10);
    }
    searchMovies(initialValues);
  }, [page, recordsPerPage]);

  function searchMovies(values: filterMoviesForm) {
    values.recordsPerPage = recordsPerPage;
    editURL(values);
    const search = async () => {
      try {
        const url_values = `${urlMovies}/filter`;
        const param_values = values;
        const response: AxiosResponse<ApiResponse<any>> = await axios.get(
          url_values,
          {
            headers: { "x-version": "2" },
            params: param_values,
          }
        );
        if (response && response.data && response.data.result) {
          const totalRows = parseInt(response.headers["totalsizerecords"], 10); // (todo en minúsculas acá) nombre de la variable en Header de la cantidad total de resutlados en la API
          setTotalPages(Math.ceil(totalRows / initialValues.recordsPerPage));
          setMovies(response.data.result);
        } else {
          throw new Error("Formato de datos inesperado de la API.");
        }
      } catch (error: any) {
        handleErrors(error, setErrors);
      }
    };
    search();
  }

  function editURL(values: filterMoviesForm) {
    const queryStrings: string[] = [];
    if (values.title) {
      queryStrings.push(`title=${values.title}`);
    }
    if (values.genreId) {
      queryStrings.push(`genreId=${values.genreId}`);
    }
    if (values.nextPremiere) {
      queryStrings.push(`nextPremiere=${values.nextPremiere}`);
    }
    if (values.onCinema) {
      queryStrings.push(`onCinema=${values.onCinema}`);
    }
    queryStrings.push(`page=${values.page}`);
    navigate(`/movies/filter?${queryStrings.join("&")}`); // join agrega & en los valores de un array
  }

  return (
    <>
      <ShowErrors errors={errors} />
      <div className="mt-4">
        <h3>Filtrar Películas</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            values.page = 1;
            searchMovies(values);
          }}
        >
          {(formikProps) => (
            <>
              <Form>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Título de la película"
                      {...formikProps.getFieldProps("title")}
                    />
                  </div>
                  <div className="form-group mx-sm-3">
                    <select
                      className="form-control"
                      {...formikProps.getFieldProps("genreId")}
                      onChange={(e) => {
                        // Convierte el valor a number antes de llamar a setFieldValue
                        formikProps.setFieldValue(
                          "genreId",
                          parseInt(e.target.value, 10)
                        );
                      }}
                    >
                      <option value="0">--Seleccione un género--</option>
                      {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-check mx-sm-3">
                    <Field
                      type="checkbox"
                      id="nextPremiere"
                      name="nextPremiere"
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="nextPremiere">
                      Próximos estrenos
                    </label>
                  </div>
                  <div className="form-check mx-sm-3">
                    <Field
                      type="checkbox"
                      id="onCinema"
                      name="onCinema"
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="onCinema">
                      En cines
                    </label>
                  </div>
                  <div className="d-flex">
                    <Button
                      className="btn btn-primary mx-2"
                      onClick={() => formikProps.submitForm()}
                    >
                      Filtrar
                    </Button>
                    <Button
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        formikProps.setValues(initialValues);
                        searchMovies(initialValues);
                      }}
                    >
                      Limpiar
                    </Button>
                  </div>
                </div>
              </Form>

              <ListMovies movies={movies} />

              <div
                className="form-group"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <label>Cantidad</label>
                <select
                  className="form-control"
                  defaultValue={10}
                  style={{ width: "60px" }}
                  onChange={(e) => {
                    setPage(1);
                    setRecordsPerPage(parseInt(e.currentTarget.value, 10));
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <Pagination
                onChange={(newPage: any) => {
                  formikProps.values.page = newPage;
                  searchMovies(formikProps.values);
                }}
                actualPage={formikProps.values.page}
                totalPages={totalPages}
              />
            </>
          )}
        </Formik>
      </div>
    </>
  );
}

interface filterMoviesForm {
  title: string;
  genreId: number;
  nextPremiere: boolean;
  onCinema: boolean;
  page: number;
  recordsPerPage: number;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
}
