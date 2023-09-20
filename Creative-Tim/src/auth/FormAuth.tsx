import { Form, Formik, FormikHelpers } from "formik";
import { userCredential } from "./auth.model";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { useState } from "react";

export default function FormAuth(props: formAuthProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Dato requerido.")
          .email("Email inválido."),
        password: Yup.string().required("Dato requerido."),
      })}
    >
      {(formikProps) => (
        <Form>
          {/* {props.isRegister ? (
            <FormGroupText label="Nombre de usuario" field="Username" />
          ) : null} */}
          <FormGroupText label="Email" field="email" />
          <FormGroupText
            label="Password"
            field="password"
            type={showPassword ? "text" : "password"}
            removeFinalBreak={true}
          />

          {/* Checkbox para mostrar u ocultar la contraseña */}
          <div className="form-check mb-3 mt-n5">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPasswordCheck"
              onChange={togglePasswordVisibility}
            />
            <label className="form-text" htmlFor="showPasswordCheck">
              Mostrar contraseña
            </label>
          </div>

          <div className="d-flex justify-content-center">
            <Button disabled={formikProps.isSubmitting} type="submit">
              Confirmar
            </Button>
            <Link className="btn btn-secondary btn-sm ms-2" to="/">
              Cancelar
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

interface formAuthProps {
  model: userCredential;
  onSubmit(
    values: userCredential,
    actions: FormikHelpers<userCredential>
  ): void;
  isRegister?: boolean;
}
