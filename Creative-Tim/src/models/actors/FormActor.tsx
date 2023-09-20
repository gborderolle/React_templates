import { Form, Formik, FormikHelpers } from "formik";
import FormGroupText from "../../utils/FormGroupText";
import * as Yup from "yup";
import { actorCreationDTO } from "./actor.model";
import FormGroupDate from "../../utils/FormGroupDate";
import { Link } from "react-router-dom";
import Button from "../../utils/Button";
import FormGroupImage from "../../utils/FormGroupImage";
import FormGroupMarkdown from "../../utils/FormGroupMarkdown";
import { useState } from "react";

export default function FormActor(props: formActorProps) {
  const initialValues: actorCreationDTO = {
    ...props.model,
    biography: props.model.biography || "",
  };

  const [born, setBorn] = useState<Date>(props.model.born || new Date());

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Dato requerido.")
          .firstCharCapitalization(),
        born: Yup.date(),

        //born: Yup.date().nullable().required("Dato requerido."),
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
                <FormGroupDate field="born" label="Fecha de nacimiento" />
                <FormGroupImage
                  field="photo"
                  label="Foto"
                  imageURL={props.model.photoURL}
                />
                <FormGroupMarkdown field="biography" label="Biografía" />
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

interface formActorProps {
  formName: string;
  model: actorCreationDTO;
  onSubmit(
    values: actorCreationDTO,
    action: FormikHelpers<actorCreationDTO>
  ): void;
}
