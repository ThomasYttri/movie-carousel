import IMovie from "./IMovie";

export default interface ICarousel {
  title: string;
  movies: IMovie[] | undefined;
  toggleFavorite: (movie: IMovie) => void;
  clearFavorites?: () => void;
}
