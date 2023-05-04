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

## Improvements
### Fetching movies
I would like to fetch movies using SSR or SSG, and cached. The cache could be revalidated using a webhook from the backend, but in this case a incremental static regeneration would make more sense. Endpoint logic for fetching multible pages is a bit messy and confusing for future developer.

### SEO
Caching response from the API would improve SEO, making content available for robots. Structured data for movies? (https://developers.google.com/search/docs/appearance/structured-data/movie)

### Accessability
Should probably provide text alternatives and better image alt tags. Arrows for scrolling would be nice as a backup for users not able to scroll. Descriptive aria-label on favorite button.

### Movie pages
Using dynamic routing for generating sub-pages for each movie. Linking each movie in the carousel to the movies page.


