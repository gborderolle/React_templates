import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, ReactElement } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShowErrors from "./ShowErrors";
import GenericList from "./GenericList";
import { handleErrors } from "../../utils/HandleErrors";
import showConfirm from "./ShowConfirm";
import Pagination from "./Pagination";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, [page, recordsPerPage]);

  async function deleteEntity(id: number) {
    try {
      const url_values = `${props.url}/${id}`;
      const param_values = {};
      await axios.delete(url_values, {
        headers: { "x-version": "2" },
        params: param_values,
      });
      loadData();
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  }

  function loadData() {
    const url_values = props.url;
    const param_values = {
      page,
      recordsPerPage,
    };
    axios
      .get(url_values, {
        headers: { "x-version": "2" },
        params: param_values,
      })
      .then((response: AxiosResponse) => {
        if (response.data.isSuccess && Array.isArray(response.data.result)) {
          const totalRows = parseInt(response.headers["totalsizerecords"], 10); // (todo en minúsculas acá) nombre de la variable en Header de la cantidad total de resutlados en la API
          setTotalPages(Math.ceil(totalRows / recordsPerPage));
          setEntities(response.data.result);
        } else {
          console.error("Unexpected data format from the API.");
        }
      })
      .catch((error: any) => {
        handleErrors(error, setErrors);
      });
  }

  const buttons = (urlEdit: string, id: number) => (
    <>
      <Link className="btn btn-success btn-sm mr-1" to={urlEdit}>
        Editar
      </Link>
      <Button
        className="btn btn-danger btn-sm"
        onClick={() => showConfirm(() => deleteEntity(id))}
      >
        Borrar
      </Button>
    </>
  );

  return (
    <>
      <ShowErrors errors={errors} />
      <div className="mt-4">
        <div
          className="card text-white bg-secondary mb-3"
          style={{ maxWidth: "50rem" }}
        >
          <div className="card-header">
            <h3>{props.title}</h3>
          </div>
          <div className="card-body">
            <ol className="list-group list-group-numbered">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  {props.urlCreate ? (
                    <Link to={props.urlCreate}>
                      Crear{" "}
                      {props.title ? props.title.toLocaleLowerCase() : null}
                    </Link>
                  ) : null}
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto w-100">
                  <label>Listado:</label>

                  <GenericList list={entities}>
                    <table className="table table-stripped">
                      {props.children(entities!, buttons)}
                    </table>
                  </GenericList>

                  <hr />
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
                    totalPages={totalPages}
                    actualPage={page}
                    onChange={(newPage) => {
                      setPage(newPage);
                    }}
                  />
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

interface indexEntityProps<T> {
  url: string;
  urlCreate?: string;
  children(
    entities: T[],
    buttons: (urlEdit: string, id: number) => ReactElement
  ): ReactElement;
  title: string;
}
