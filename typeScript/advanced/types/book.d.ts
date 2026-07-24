export type EntityId = {
  id: string | number;
};
export type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};
export type HasId = {
  id: EntityId;
};
export type IsbnParts = [
  group: number,
  publisher: string,
  titleIdentifier: string,
];

export type Book = {
  title: string;
  author: string;
  isbn: IsbnParts;
  isAvailable: boolean;
} & Timestamped &
  HasId;

export type BookCreatePayload = Omit<Book, "id" | "createdAt" | "updatedAt">;

export type bookUpdatePayload = Partial<BookCreatePayload>;

export type BookPreview = Pick<Book, "id" | "title" | "author">;

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
