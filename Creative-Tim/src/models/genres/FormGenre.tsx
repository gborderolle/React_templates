import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { genreCreationDTO } from "./genre.model";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import FormGroupText from "../../utils/FormGroupText";

export default function FormGenre(props: formGenreProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Dato requerido.")
          .firstCharCapitalization()
          .max(100, "El dato no puede tener más de 100 caracteres"),
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
                <br />
                <div
                  className="btn-group"
                  role="group"
                  aria-label="First group"
                >
                  <Button type="submit" disabled={formikProps.isSubmitting}>
                    Guardar
                  </Button>
                  <Link className="btn btn-sm btn-secondary" to="/actors">
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

interface formGenreProps {
  formName: string;
  model: genreCreationDTO;
  onSubmit(
    values: genreCreationDTO,
    action: FormikHelpers<genreCreationDTO>
  ): void;
}
