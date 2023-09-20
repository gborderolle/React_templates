import { Field, ErrorMessage } from "formik";
import ShowErrorField from "./ShowErrorField";

export default function FormGroupText(props: formGroupTextProps) {
  const customStyleObj = props.customStyle ? JSON.parse(props.customStyle) : {};

  return (
    <>
      {props.label ? <h5 className="card-title">{props.label}</h5> : null}
      <Field
        type={props.type}
        name={props.field}
        className={`form-control ${props.customClass || ""}`}
        style={customStyleObj}
      />
      <ErrorMessage name={props.field}>
        {(msg: string) => <ShowErrorField message={msg} />}
      </ErrorMessage>
      {props.removeFinalBreak ? null : <br />}
    </>
  );
}

// define los parámetros de entrada del componente
interface formGroupTextProps {
  formName?: string;
  field: string;
  type: "text" | "password";
  label?: string;
  placeholder?: string;
  customClass?: string;
  customStyle?: string;
  removeFinalBreak?: boolean;
}

FormGroupText.defaultProps = {
  type: "text",
};
