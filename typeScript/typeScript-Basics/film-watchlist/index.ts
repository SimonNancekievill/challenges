import type { IFilm, IPlaylist } from "./types.ts";

export const myPlaylist: IPlaylist = {
  name: "Weekend Watchlist",
  films: [
    {
      id: 1,
      title: "The Grand Budapest Hotel",
      year: 2014,
      watched: true,
      rating: 5,
    },
    {
      id: 2,
      title: "Arrival",
      year: 2016,
      watched: true,
      rating: 4,
    },
    {
      id: 3,
      title: "Dune: Part Two",
      year: 2024,
      watched: false,
    },
  ],
};

function formatFilm(film: IFilm): string {
  if (film.watched === true) {
    return `I watched ${film.title}, released in ${film.year}${film.rating !== undefined ? ` and rated it a ${film.rating} out of 5.` : "."}`;
  } else {
    return `I want to watch ${film.title} which was released in ${film.year}`;
  }
}

function getUnwatched(myPlaylist: IPlaylist): IFilm[] {
  return myPlaylist.films.filter((film) => film.watched === false);
}

myPlaylist.films.forEach((film) => console.log(formatFilm(film)));
console.log(getUnwatched(myPlaylist));
