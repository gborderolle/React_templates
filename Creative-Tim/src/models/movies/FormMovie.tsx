// Formulario que sirve para Crear y Editar movies

import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { movieCreationDTO } from "../movies/movie.model";
import { Link } from "react-router-dom";
import { genreDTO } from "../genres/genre.model";
import { cinemaDTO } from "../cinemas/cinema.model";
import { actorMovieDTO } from "../actors/actor.model";
import TypeaheadActors from "../actors/TypeaheadActors";
import { useState } from "react";
import { Button } from "react-bootstrap";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupDate from "../../utils/FormGroupDate";
import FormGroupImage from "../../utils/FormGroupImage";
import FormGroupMarkdown from "../../utils/FormGroupMarkdown";
import FormGroupText from "../../utils/FormGroupText";
import MultipleSelector, {
  multipleSelectorModel,
} from "../../utils/MultipleSelector";

export default function FormMovie(props: formMovieProps) {
  const [selectedActors, setSelectedActors] = useState<actorMovieDTO[]>(
    props.selectedActors
  );

  const [selectedGenres, setSelectedGenres] = useState(
    mapDTO(props.selectedGenres)
  );
  const [noSelectedGenres, setNoSelectedGenres] = useState(
    mapDTO(props.noSelectedGenres)
  );

  const [selectedCinemas, setSelectedCinemas] = useState(
    mapDTO(props.selectedCinemas)
  );
  const [noSelectedCinemas, setNoSelectedCinemas] = useState(
    mapDTO(props.noSelectedCinemas)
  );

  function mapDTO(
    array: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return array.map((value) => {
      return { key: value.id, value: value.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.genreIds = selectedGenres.map((value) => value.key);
        values.cinemaIds = selectedCinemas.map((value) => value.key);
        values.actors = selectedActors;
        props.onSubmit(values, actions);
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("Dato requerido.")
          .firstCharCapitalization(),
      })}
    >
      {(formikProps) => (
        <Form>
          <div className="mt-4">
            <div
              className="card text-white bg-secondary mb-3"
              style={{ maxWidth: "50rem" }}
            >
              <div className="card-header">
                <h3>{props.formName}</h3>
              </div>
              <div className="card-body">
                <FormGroupText
                  formName={props.formName}
                  field="title"
                  label="Nombre"
                />
                <FormGroupCheckbox field="onCinema" label="En cines" />
                <br />
                <FormGroupText
                  formName={props.formName}
                  field="trailer"
                  label="Trailer"
                />
                <FormGroupDate field={"premiere"} label={"Fecha lanzamiento"} />
                <FormGroupImage
                  field={"poster"}
                  label={"Poster"}
                  imageURL={props.model.posterURL}
                  customStyle='{"maxWidth": "25rem", "borderRadius": "10px"}'
                />
                <FormGroupMarkdown field="description" label="Descripción" />

                <br />
                <div className="form-group">
                  <label>Géneros:</label>
                  <MultipleSelector
                    selected={selectedGenres}
                    noSelected={noSelectedGenres}
                    onChange={(selected, noSelected) => {
                      setSelectedGenres(selected);
                      setNoSelectedGenres(noSelected);
                    }}
                  />
                </div>

                <br />
                <div className="form-group">
                  <label>Cines:</label>
                  <MultipleSelector
                    selected={selectedCinemas}
                    noSelected={noSelectedCinemas}
                    onChange={(selected, noSelected) => {
                      setSelectedCinemas(selected);
                      setNoSelectedCinemas(noSelected);
                    }}
                  />
                </div>

                <div className="form-group">
                  <TypeaheadActors
                    onAdd={(actors) => setSelectedActors(actors)}
                    onRemove={(actor) => {
                      const actors = selectedActors.filter((x) => x !== actor);
                      setSelectedActors(actors);
                    }}
                    actors={selectedActors}
                    listUI={(actor: actorMovieDTO) => (
                      <>
                        {actor.name} /
                        <input
                          placeholder="Personaje"
                          type="text"
                          value={actor.character || ""} // Usar cadena vacía como valor por defecto
                          onChange={(e) => {
                            // Buscar el índice del actor en el array selectedActors
                            const index = selectedActors.findIndex(
                              (x) => x.id === actor.id
                            );

                            // Verificar si el índice es válido
                            if (index !== -1) {
                              const actors = [...selectedActors];

                              // Actualizar el campo 'character' del actor
                              actors[index].character = e.currentTarget.value;

                              // Actualizar el estado de selectedActors
                              setSelectedActors(actors);
                            }
                          }}
                        />
                      </>
                    )}
                  />
                </div>

                <br />
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  <Button type="submit" disabled={formikProps.isSubmitting}>
                    Guardar
                  </Button>
                  <Link className="btn btn-sm btn-secondary" to="/">
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

interface formMovieProps {
  model: movieCreationDTO;
  formName: string;
  onSubmit(
    values: movieCreationDTO,
    action: FormikHelpers<movieCreationDTO>
  ): void;
  selectedGenres: genreDTO[];
  noSelectedGenres: genreDTO[];
  selectedCinemas: cinemaDTO[];
  noSelectedCinemas: cinemaDTO[];
  selectedActors: actorMovieDTO[];
}
