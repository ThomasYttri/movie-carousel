import IMovie from "@/types/IMovie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.API_KEY;
    // Retrieve the first page of search results
    const firstResponse = await fetch(
      `http://www.omdbapi.com/?s=James+Bond&type=movie&page=1&apikey=${apiKey}`
    );
    const firstData = await firstResponse.json();

    // Check if there are any search results
    if (firstData.Response === "False") {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    // Retrieve the remaining pages of search results (if needed) and combine the results
    const totalPages = Math.ceil(parseInt(firstData.totalResults) / 10);
    const searchPages = totalPages > 4 ? 4 : totalPages;
    const remainingPages = Math.min(searchPages - 1, 1);
    const requests = [];
    for (let i = 2; i <= remainingPages + 1; i++) {
      requests.push(
        fetch(
          `http://www.omdbapi.com/?s=James+Bond&type=movie&page=${i}&apikey=${apiKey}`
        )
      );
    }
    const responses = await Promise.all(requests);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    const allMovies: IMovie[] = [firstData, ...data].flatMap(
      (page) => page.Search
    );

    const filteredMovies = allMovies.filter(
      (movie) => movie.Poster && movie.Poster !== "N/A"
    );
    // Randomly select 20 movies from the search results
    const randomMovies = filteredMovies
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);

    res.status(200).json(randomMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
