import { ICarouselItem } from "@/types/ICarouselItem";
import Image from "next/image";

export const CarouselItem = ({ movie, toggleFavorite }: ICarouselItem) => {
  return (
    <div className="snap-center flex-66 shrink-0 md:basis-[30%] ">
      <div className="group relative aspect-video cursor-pointer transition rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg">
        <Image
          src={movie.Poster}
          alt={movie.Title + " poster"}
          fill
          sizes="(max-width: 768px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        <button
          onClick={() => toggleFavorite(movie)}
          aria-label="Toggle favorite"
          className="absolute hidden right-2 bottom-2 transition hover:scale-110 group-hover:block"
        >
          <Image src="assets/heart-icon.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
