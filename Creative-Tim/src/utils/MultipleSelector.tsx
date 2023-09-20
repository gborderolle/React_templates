// Clase 86: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/25950792#overview

import { ReactElement } from "react";
import "./MultipleSelector.css";

export default function MultipleSelector(props: multipleSelectorProps) {
  function select(item: multipleSelectorModel) {
    const selected = [...props.selected, item];
    const noSelected = props.noSelected.filter((value) => value !== item);
    props.onChange(selected, noSelected);
  }

  function deselect(item: multipleSelectorModel) {
    const selected = props.selected.filter((value) => value !== item);
    const noSelected = [...props.noSelected, item];
    props.onChange(selected, noSelected);
  }

  function selectAll() {
    const selected = [...props.selected, ...props.noSelected];
    const noSelected: multipleSelectorModel[] = [];
    props.onChange(selected, noSelected);
  }

  function deselectAll() {
    const noSelected = [...props.selected, ...props.noSelected];
    const selected: multipleSelectorModel[] = [];
    props.onChange(selected, noSelected);
  }

  return (
    <div className="multiple-selector">
      <ul>
        {props.noSelected.map((item) => (
          <li
            key={item.key}
            onClick={() => {
              select(item);
            }}
          >
            {item.value}
          </li>
        ))}
      </ul>
      <div className="multiple-selector-buttons">
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={selectAll}
        >
          {">>"}
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={deselectAll}
        >
          {"<<"}
        </button>
      </div>
      <ul>
        {props.selected.map((item) => (
          <li
            key={item.key}
            onClick={() => {
              deselect(item);
            }}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface multipleSelectorProps {
  selected: multipleSelectorModel[];
  noSelected: multipleSelectorModel[];
  onChange(
    selected: multipleSelectorModel[],
    noSelected: multipleSelectorModel[]
  ): void;
}

export interface multipleSelectorModel {
  key: number;
  value: string;
}
