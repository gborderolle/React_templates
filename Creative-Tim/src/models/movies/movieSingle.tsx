import { Link } from "react-router-dom";
import { movieDTO } from "./movie.model";

export default function MovieSingle(props: MovieSingleProps) {
  const setupLink = () => `/movies/${props.movie.id}`;

  return (
    <>
      <div>
        <div
          className="card m-2"
          style={{ width: "20rem", height: "600px", overflow: "auto" }}
        >
          <Link to={setupLink()}>
            <img
              className="card-img-top"
              src={props.movie.posterURL}
              alt="Poster"
            />
          </Link>

          <div className="card-body">
            <h5 className="card-title">{props.movie.title}</h5>
            <p className="card-text">{props.movie.description}</p>
            <Link to={setupLink()} className="btn btn-primary">
              Ver película
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

interface MovieSingleProps {
  movie: movieDTO;
}
