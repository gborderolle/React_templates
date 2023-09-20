import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { reviewCreationDTO } from "../reviews/review.model";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import FormGroupText from "../../utils/FormGroupText";

export default function FormReview(props: formReviewProps) {
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

interface formReviewProps {
  formName: string;
  model: reviewCreationDTO;
  onSubmit(
    values: reviewCreationDTO,
    action: FormikHelpers<reviewCreationDTO>
  ): void;
}
