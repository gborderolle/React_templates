import { ReactElement } from "react";
import Loading from "./Loading";
import React from "react";

export default function GenericList(props: genericListProps) {
  if (!props.list) {
    if (props.loadingUI) {
      return props.loadingUI;
    } else {
      return <Loading />;
    }
  }
  if (props.list.length === 0) {
    if (props.emptyListUI) {
      return props.emptyListUI;
    }
    return <>No hay elementos</>;
  } else {
    return props.children;
  }
}

interface genericListProps {
  list: any;
  children: ReactElement;
  loadingUI?: ReactElement;
  emptyListUI?: ReactElement;
}
