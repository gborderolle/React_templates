import GenericList from "../../views/global/GenericList";
import { movieDTO } from "./movie.model";
import MovieSingle from "./movieSingle";

export default function ListMovies(props: listMoviesProps) {
  return (
    <GenericList list={props.movies}>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide multi-item-carousel"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner customCarousel"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {props.movies?.map((movie) => (
            <MovieSingle movie={movie} key={movie.id} />
          ))}
        </div>

      </div>
    </GenericList>
  );
}
interface listMoviesProps {
  movies?: movieDTO[];
}
