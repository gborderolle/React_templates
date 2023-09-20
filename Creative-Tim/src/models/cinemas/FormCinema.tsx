import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { cinemaCreationDTO } from "./cinema.model";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import FormGroupText from "../../utils/FormGroupText";
import { coordinateDTO } from "../../utils/coordinateDTO";
import LeafletMapForm from "../../utils/LeafletMapForm";

export default function FormCinema(props: formCinemaProps) {
  function transformCoordinates(): coordinateDTO[] | undefined {
    if (props.model.latitude && props.model.longitude) {
      const response: coordinateDTO = {
        latitude: props.model.latitude,
        longitude: props.model.longitude,
      };
      return [response];
    }
    return undefined;
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
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
                  field="name"
                  label="Nombre"
                />
                <div style={{ marginBottom: "1rem" }}>
                  <LeafletMapForm
                    fieldLat="latitude"
                    fieldLong="longitude"
                    coordinates={transformCoordinates()}
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
                  <Link className="btn btn-sm btn-secondary" to="/cinemas">
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

interface formCinemaProps {
  formName: string;
  model: cinemaCreationDTO;
  onSubmit(
    values: cinemaCreationDTO,
    action: FormikHelpers<cinemaCreationDTO>
  ): void;
}
