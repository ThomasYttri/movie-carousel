import IMovie from "./IMovie";

export interface ICarouselItem {
  movie: IMovie;
  toggleFavorite: (movie: IMovie) => void;
}
