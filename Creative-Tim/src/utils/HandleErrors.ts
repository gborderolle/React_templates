export async function handleErrors(error: any, setErrors: Function) {
  if (
    error.response &&
    error.response.data &&
    error.response.data.errorMessages
  ) {
    setErrors(error.response.data.errorMessages);
  } else if (error.response && error.response.data) {
    setErrors([error.response.data]);
  } else if (error.message) {
    setErrors([error.message]);
  } else {
    setErrors(["Se produjo un error inesperado."]);
  }
}
