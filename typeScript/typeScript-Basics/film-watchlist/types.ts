export interface IWatchable {
  readonly id: number;
  title: string;
  year: number;
}

export interface IFilm extends IWatchable {
  watched: boolean;
  rating?: number;
}

export interface IPlaylist {
  name: string;
  films: IFilm[];
}
