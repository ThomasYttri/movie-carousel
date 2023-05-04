import IMovie from "@/types/IMovie";
import ICarousel from "@/types/ICarousel";
import Image from "next/image";
import { CarouselItem } from "./carouselItem";

export default function Carousel({
  title,
  movies,
  toggleFavorite,
  clearFavorites,
}: ICarousel) {
  if (!movies) return <></>;
  return (
    <section className="max-w-full py-4">
      <h2 className="mb-4 ml-2 text-2xl">{title}</h2>
      <div className="relative w-full flex gap-6 py-4 px-8 snap-x overflow-x-auto scrollbar-hide">
        {/* <div className="flex overflow-x-scroll overflow-y-visible gap-4 p-2 pb-6 -mb-2"> */}
        {movies.map((movie: IMovie, index: number) => {
          if (!movie.Poster || movie.Poster == "N/A") return;
          return (
            <CarouselItem
              key={index}
              movie={movie}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
      {clearFavorites && (
        <button
          className=" bg-slate-800 px-8 py-4 ml-8 rounded-lg transition hover:bg-slate-900 disabled:bg-slate-500"
          disabled={!movies || movies.length < 0}
          onClick={clearFavorites}
        >
          Clear favorites
        </button>
      )}
    </section>
  );
}
