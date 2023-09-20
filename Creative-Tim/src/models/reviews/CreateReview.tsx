import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import FormReview from "./FormReview";

export default function CreateReview() {
  return <>
    <FormReview
      formName="Crear review"
      model={{ name: '' }}
      onSubmit={async (values) => {
        await new Promise(r => setTimeout(r, 1000))
        console.log(values);
      }}
    />
  </>;
}
