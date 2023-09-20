// Captura de errores: ErrorBoundary (tipo try catch)
// Clase 51: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25791072#overview

import React, { ReactElement, ReactNode } from "react";

export default class ErrorBoundary extends React.Component<
  errorBoundaryProps,
  errorBoundaryState
> {
  constructor(props: errorBoundaryProps) {
    super(props);
    this.state = { hayError: false, mensaje: "" };
  }

  // componentDidCatch se ejecuta si hay un error en el componente (este método no existe en los Componentes funcionales)
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
  }

  // cambia el estado en caso de haber error
  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hayError: true, mensaje: error };
  }

  render() {
    if (this.state.hayError) {
      if (this.props.errorUI) {
        return this.props.errorUI;
      } else {
        return (
          <h3 style={{ fontStyle: "italic", color: "gray" }}>
            {this.state.mensaje}
          </h3>
        );
      }
    }
    return this.props.children;
  }
}

interface errorBoundaryState {
  hayError: boolean;
  mensaje: string;
}

interface errorBoundaryProps {
  errorUI?: ReactElement;
  children?: ReactNode;
}
