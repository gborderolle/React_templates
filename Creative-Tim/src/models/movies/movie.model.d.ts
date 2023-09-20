import { actorMovieDTO } from "../actors/actor.model";
import { cinemaDTO } from "../cinemas/cinema.model";
import { genreDTO } from "../genres/genre.model";
import { reviewDTO } from "../reviews/review.model";

export interface movieCreationDTO {
  title: string;
  onCinema: boolean;
  trailer?: string;
  description?: string;
  premiere?: Date;
  poster?: File;
  posterURL?: string;
  genreIds?: number[];
  cinemaIds?: number[];
  actors?: actorMovieDTO[];
}

export interface landingPageDTO {
  moviesInTheatres?: movie[];
  moviesNextReleases?: movie[];
}

export interface movieDTO {
  id: number;
  title: string;
  onCinema: boolean;
  posterURL?: string;
  trailer?: string;
  description?: string;
  premiere?: Date;
  cinemas?: cinemaDTO[];
  genres?: genreDTO[];
  actors?: actorMovieDTO[];
  reviews?: reviewDTO[];
}

export interface movieDetailsDTO {
  movie: movieDTO;
  cinemas?: cinemaDTO[];
  genres?: genreDTO[];
  actors?: actorMovieDTO[];
  reviews?: reviewDTO[];
  userVote?: number;
  averageVote?: number;
}

export interface moviePutGetDTO {
  movie: movieDTO;
  selectedGenres: genreDTO[];
  noSelectedGenres: genreDTO[];
  selectedCinemas: cinemaDTO[];
  noSelectedCinemas: cinemaDTO[];
  actorMovieDTO: actorMovieDTO[];
}

export type moviesPostGetDTO = {
  result: {
    genres: genreDTO[];
    cinemas: cinemaDTO[];
  };
};
