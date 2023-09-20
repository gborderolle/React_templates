// Typeahead: Buscador inteligente
// Clase 88: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25952594#overview

// Clase 89: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25968684#overview
// Mostrar foto junto a la sugerencia

import axios, { isAxiosError, AxiosResponse } from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "./actor.model";
import { ReactElement, useEffect, useState } from "react";
import { urlActors } from "../../utils/endpoints";
import { handleErrors } from "../../utils/HandleErrors";

export default function TypeaheadActors(props: typeaheadActorsProps) {
  const [actors, setActors] = useState<actorMovieDTO[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const selection: actorMovieDTO[] = [];
  const [draggedElement, setDraggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);

  useEffect(() => {
    loadData();
  }, []);

  function dragStartEvent(actor: actorMovieDTO) {
    setDraggedElement(actor);
  }

  function dragOverEvent(actor: actorMovieDTO) {
    if (!draggedElement) {
      return;
    }
    if (actor.id !== draggedElement.id) {
      const draggedElementIndex = props.actors.findIndex(
        (x) => x.id === draggedElement.id
      );
      const actorIndex = props.actors.findIndex((x) => x.id === actor.id);

      const actors = [...props.actors];
      actors[actorIndex] = draggedElement;
      actors[draggedElementIndex] = actor;
      props.onAdd(actors);
    }
  }

  function loadData() {
    const url_values = `${urlActors}`;
    const param_values = {};

    axios
      .get(url_values, {
        headers: { "x-version": "2" },
        params: param_values,
      })
      .then((response: AxiosResponse) => {
        if (response.data.isSuccess && Array.isArray(response.data.result)) {
          setActors(response.data.result);
        } else {
          console.error("Unexpected data format from the API.");
        }
      })
      .catch((error: any) => {
        handleErrors(error, setErrors);
      });
  }

  return (
    <>
      <label>Actores:</label>
      <Typeahead
        id="typeahead"
        onChange={(selectedOptions: any[]) => {
          const selectedActor = selectedOptions[0] as actorMovieDTO;
          if (props.actors.findIndex((x) => x.id === selectedActor.id) === -1) {
            props.onAdd([...props.actors, selectedActor]);
          }
        }}
        options={actors}
        labelKey={(actor: any) => actor.name}
        filterBy={["name"]}
        placeholder="Escriba el nombre del actor."
        minLength={2} // cantidad mínima de letras para que comience a sugerir
        flip={true} // true para mostrar las sugerencias hacia arriba
        selected={selection}
        renderMenuItemChildren={(actor: any) => (
          <>
            <img
              src={actor.photoURL}
              alt="Imagen actor"
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{actor.name}</span>
          </>
        )} // mostrar foto junto a la sugerencia
      />
      <ul className="list-group">
        {props.actors?.map((actor) => (
          <li
            key={actor.id}
            className="list-group-item list-group-item-action"
            draggable={true}
            onDragStart={() => dragStartEvent(actor)}
            onDragOver={() => dragOverEvent(actor)}
          >
            {props.listUI(actor)}
            <span
              className="badge bg-primary pointer"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface typeaheadActorsProps {
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  listUI(actor: actorMovieDTO): ReactElement;
  onRemove(actor: actorMovieDTO): void;
}
