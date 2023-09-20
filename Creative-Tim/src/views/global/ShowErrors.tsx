import React from "react";

// Clase 115: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25991890#overview
export default function ShowErrors(props: showErrorsProps) {
  if (!Array.isArray(props.errors)) {
    console.error(
      "ShowErrors component received a non-array prop:",
      props.errors
    );
    return null;
  }

  return (
    <>
      {props.errors.length > 0 ? (
        <div className="alert alert-danger">
          <ul>
            {props.errors.map((error, index) => (
              <li key={index}>
                {typeof error === "string" ? error : JSON.stringify(error)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

interface showErrorsProps {
  errors: Array<string | object>;
}
