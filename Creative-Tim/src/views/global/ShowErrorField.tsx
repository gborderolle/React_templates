export default function ShowErrorField(props: showErrorFieldProps) {
  return <div className="text-danger">{props.message}</div>;
}

// define los parámetros de entrada del componente
interface showErrorFieldProps {
  message: string;
}
