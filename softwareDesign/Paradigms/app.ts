type BookCatalogue = {
  id: number;
  title: string;
  author_name: string;
  is_available: boolean;
  added_at: Date;
};

type BookResponse = {
  id: number;
  title: string;
  authorName: string;
  addedAt: Date;
};

const books: BookCatalogue[] = [
  {
    id: 1,
    title: "The Hobbit",
    author_name: "J.R.R. Tolkien",
    is_available: true,
    added_at: new Date("2023-01-15"),
  },
  {
    id: 2,
    title: "Dune",
    author_name: "Frank Herbert",
    is_available: false,
    added_at: new Date("2023-03-22"),
  },
  {
    id: 3,
    title: "1984",
    author_name: "George Orwell",
    is_available: true,
    added_at: new Date("2022-11-05"),
  },
  {
    id: 4,
    title: "The Name of the Wind",
    author_name: "Patrick Rothfuss",
    is_available: true,
    added_at: new Date("2024-02-10"),
  },
];

const availableBooks: BookResponse[] = books
  .filter((book) => book.is_available === true)
  .map((book) => ({
    id: book.id,
    title: book.title,
    authorName: book.author_name,
    addedAt: book.added_at,
  }));

console.log(availableBooks);

class BookReservation {
  name: string;
  book_title: string;

  constructor(name: string, book_title: string) {
    this.name = name;
    this.book_title = book_title;
  }
}
