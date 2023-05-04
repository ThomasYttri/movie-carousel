import Carousel from "@/components/carousel";
import IMovie from "@/types/IMovie";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>();
  const [favorites, setFavorites] = useState<IMovie[]>();
  //Function for toggle movie as favourite
  const toggleFavorite = (movie: IMovie) => {
    let newFavorites: IMovie[] = [];
    if (!favorites || favorites.length === 0) {
      newFavorites.push(movie);
      setFavorites(newFavorites);
      localStorage.setItem("favorite-movies", JSON.stringify(newFavorites));
      return;
    }
    // If movie already is favorited, remove from favorites
    if (favorites.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
      newFavorites = favorites.filter(
        (favorite) => favorite.imdbID !== movie.imdbID
      );
      setFavorites(newFavorites);
    } else {
      newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
    }
    localStorage.setItem("favorite-movies", JSON.stringify(newFavorites));
  };

  //Clear favorites
  const clearFavorites = () => {
    setFavorites([]);
  };
  // Could have been solved with getStaticProps + webhook or SSR
  useEffect(() => {
    async function FetchData() {
      const res = await fetch("/api/getMovies");
      const fetchedMovies = await res.json();
      setMovies(fetchedMovies);
    }
    FetchData();
    const localFavorites = localStorage.getItem("favorite-movies");
    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites));
    }
  }, []);
  return (
    <main className={`min-h-screen py-4 ${inter.className}`}>
      {movies && movies.length > 0 ? (
        <Carousel
          title={"James Bond movies"}
          movies={movies}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <p className="text-red-300">No movies returned from API</p>
      )}
      {favorites && (
        <Carousel
          title="Favourites"
          movies={favorites}
          clearFavorites={clearFavorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}
