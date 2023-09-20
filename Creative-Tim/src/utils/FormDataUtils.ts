import { actorCreationDTO } from "../models/actors/actor.model";
import { movieCreationDTO } from "../models/movies/movie.model";

export function ConvertActorToFormData(actor: actorCreationDTO): FormData {
  const formData = new FormData();
  formData.append("name", actor.name);
  if (actor.biography) {
    formData.append("biography", actor.biography);
  }
  if (actor.born) {
    formData.append("born", dateFormat(actor.born));
  }
  if (actor.photo) {
    formData.append("photo", actor.photo, actor.photo.name);
  }
  return formData;
}

export function ConvertMovieToFormData(movie: movieCreationDTO): FormData {
  const formData = new FormData();
  formData.append("title", movie.title);
  formData.append("onCinema", String(movie.onCinema));
  if (movie.trailer) {
    formData.append("trailer", movie.trailer);
  }
  if (movie.description) {
    formData.append("description", movie.description);
  }
  if (movie.premiere) {
    formData.append("premiere", dateFormat(movie.premiere));
  }
  if (movie.poster) {
    formData.append("poster", movie.poster, movie.poster.name);
  }
  formData.append("genreIds", JSON.stringify(movie.genreIds));
  formData.append("cinemaIds", JSON.stringify(movie.cinemaIds));
  formData.append("actors", JSON.stringify(movie.actors));
  return formData;
}

function dateFormat(date: Date) {
  date = new Date(date);
  const format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [{ value: month }, , { value: day }, , { value: year }, ,] =
    format.formatToParts(date);
  return `${year}-${month}-${day}`;
}
