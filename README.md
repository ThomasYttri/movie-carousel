## Getting Started
This project is built using node version ```18.12.1```

Install node packages
```bash
npm i
```

Then run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Files
```/pages/index.tsx``` is responsible for fetching movies, storing movies and favorites states, and rendering sliders.

```/api/getMovies.ts``` Api endpoint used for fetching movies. As the OMDb API does no longer allow fetching random movies, and respons is limited to 10 movies, the endpoint was made to simulate random results. This is achieved by first searching for James Bond movies, checking amount of results, then sending a request for each page of 10 movies. This is currently limited to maximum 4 pages / requests, which results in a set of 40 movies, or less - depending on the search term. 20 movies are then randomly picked, and returned to the client.

```/components/carousel.tsx``` Is the carousel component. This component uses ```/components/carouselItem.tsx```for rendering a card for each movie.
