import { useFormikContext } from "formik";
import ShowErrorField from "./ShowErrorField";
import moment from "moment";

export default function FormGroupDate(props: formGroupDateProps) {
  const { values, validateForm, touched, errors, setFieldValue } =
    useFormikContext<any>();

  const getDateValue = () => {
    const value = values[props.field];
    if (value != undefined) {
      return moment(value).format("YYYY-MM-DD");
    }
    return "";
  };

  return (
    <div className="form-group">
      <label htmlFor={props.field}>{props.label}</label>
      <input
        type="date"
        className="form-control"
        id={props.field}
        name={props.field}
        defaultValue={getDateValue()}
        onChange={(e) => {
          const date = new Date(e.currentTarget.value + "T00:00:00");
          setFieldValue(props.field, date); // Use setFieldValue to update the value
          validateForm();
        }}
      />
      {touched[props.field] && errors[props.field] ? (
        <ShowErrorField message={errors[props.field]?.toString()!} />
      ) : null}
    </div>
  );
}
interface formGroupDateProps {
  field: string;
  label: string;
}
