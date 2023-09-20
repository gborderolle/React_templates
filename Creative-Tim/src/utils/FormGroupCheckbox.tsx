import { Field } from "formik";

export default function FormGroupCheckbox(props: formGroupCheckboxProps) {
    return (
        <div>
            <div className="form-group form-check">
                <Field className="form-check-input" id={props.field} name={props.field} type="checkbox" />
                <label htmlFor={props.field}>{props.label}</label>
            </div>
        </div>
    )
}

interface formGroupCheckboxProps {
    label: string;
    field: string;
}