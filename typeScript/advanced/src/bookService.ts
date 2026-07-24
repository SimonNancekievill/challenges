import type {
  EntityId,
  Timestamped,
  HasId,
  IsbnParts,
  Book,
  BookCreatePayload,
  BookPreview,
  bookUpdatePayload,
  ApiResponse,
} from "../types/book";

async function fetchBooks(): Promise<ApiResponse<BookPreview[]>> {
  return { status: 200, message: "OK", data: [] };
}

async function fetchBooks(id: EntityId): Promise<ApiResponse<Book>> {
  return {
    status: 200,
    message: "OK",
    data: [
      {
        title: "Das Ende von Eddy",
        author: "Édouard Louis",
        isbn: "978-0132350884",
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
}
