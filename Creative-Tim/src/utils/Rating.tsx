import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Rating.css";
import AuthenticationContext from "../auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import showToastMessage from "../views/global/ShowSuccess";

export default function Rating(props: ratingProps) {
  const { claims } = useContext(AuthenticationContext);
  const [maxValueArr, setMaxValueArr] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  const navigate = useNavigate(); // sirve para navegar entre las páginas

  useEffect(() => {
    setMaxValueArr(Array(props.maxValue).fill(0));
  }, [props.maxValue]);

  function mouseOverEvent(vote: number) {
    setSelectedValue(vote);
  }

  function onClickEvent(vote: number) {
    if (claims.length === 0) {
      // claims.length= 0: No hay user logueado
      showToastMessage({
        title: "Debes haer login para votar",
        icon: "error",
        callback: () => {
          setSelectedValue(0);
          props.onChange(0);
          return;
        },
      });
    }
    setSelectedValue(vote);
    props.onChange(vote);
  }

  return (
    <>
      {maxValueArr.map((value, index) => (
        <FontAwesomeIcon
          icon={faStar}
          key={index}
          className={`fa-lg pointer ${
            selectedValue >= index + 1 ? "checked" : null
          }`}
          onMouseOver={() => mouseOverEvent(index + 1)}
          onClick={() => onClickEvent(index + 1)}
        />
      ))}
    </>
  );
}
interface ratingProps {
  maxValue: number;
  selectedValue: number;
  onChange(vote: number): void;
}
