// Generics (mejorado con ChatGPT),Clase 122: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/26021372#overview

import axios from "axios";
import { AxiosResponse } from "axios";
import { useState, useEffect, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowErrors from "../views/global/ShowErrors";
import Loading from "../views/global/Loading";
import { handleErrors } from "./HandleErrors";

// The EditEntity component allows for the fetching and editing of an entity.
export default function EditEntity<TCreate, TRead>(
  props: editEntityProps<TCreate, TRead>
) {
  // Hooks for navigation and extracting parameters from the route.
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  // State for managing the entity being edited and potential errors.
  const [entity, setEntity] = useState<TCreate>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Validate ID to ensure it's a number.
    if (isNaN(Number(id))) {
      navigate(props.urlIndex);
      return;
    }
    fetchEntity();
  }, [id]);

  // Helper function to identify if an error comes from Axios (and thus likely from the backend).
  function isAxiosError(
    error: unknown
  ): error is { response: { data: string[] } } {
    return (
      !!error &&
      typeof error === "object" &&
      "response" in error &&
      "data" in (error as any).response
    );
  }

  // General function to handle API error responses.
  const handleApiError = (error: unknown) => {
    if (isAxiosError(error)) {
      setErrors(error.response.data);
    } else {
      setErrors(["An unexpected error occurred."]);
    }
  };

  // Function to fetch the entity data based on the ID provided in the route.
  const fetchEntity = async () => {
    try {
      const url_values = `${props.url}/${id}`;
      const param_values = {};
      const response = await axios.get<ApiResponse<TRead>>(url_values, {
        headers: { "x-version": "2" },
        params: param_values,
      });
      if (response.data.isSuccess && response.data.result != null) {
        setEntity(props.transform(response.data.result));
      } else {
        throw new Error("Unexpected data format from the API.");
      }
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
  };

  const editEntity = async (editEntity: TCreate) => {
    try {
      const url_values = `${props.url}/${id}`;
      let response: AxiosResponse<ApiResponse<TCreate[]>> | undefined;
      if (props.transformFormData) {
        const formData = props.transformFormData(editEntity);
        response = await axios.put<ApiResponse<TCreate[]>>(
          url_values,
          formData,
          {
            headers: {
              "x-version": "2",
              "Content-Type": "multipart/form-data", // importante si endpoint recibe "[FromForm]"
            },
          }
        );
      } else {
        response = await axios.put<ApiResponse<TCreate[]>>(
          url_values,
          editEntity,
          {
            headers: {
              "x-version": "2",
            },
          }
        );
      }

      if (response!.data.isSuccess && response!.data.result != null) {
        setEntity(props.transform(response!.data.result as unknown as TRead));  // Cambio aquí
      } else {
        throw new Error("Unexpected data format from the API.");
      }
    } catch (error: any) {
      handleErrors(error, setErrors);
    }
    navigate(props.urlIndex);
  };

  return (
    <>
      <ShowErrors errors={errors} /> {/* Display potential errors */}
      {entity ? props.children(entity, editEntity) : <Loading />}{" "}
      {/* Render the edit form or loading screen */}
    </>
  );
}

// Interface detailing the expected properties for the EditEntity component.
interface editEntityProps<TCreate, TRead> {
  url: string; // API endpoint URL
  urlIndex: string; // Route to navigate back after editing
  children(entity: TCreate, edit: (entity: TCreate) => void): ReactElement; // Render prop pattern for the child component
  transform(entity: TRead): TCreate; // Optional transformation function to convert fetched data to a different shape
  transformFormData?(model: TCreate): FormData;
}

// Default transformation function (a no-op) for the component.
EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};

interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
}
