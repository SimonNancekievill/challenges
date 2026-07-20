const formElement = document.getElementById("search-form") as HTMLFormElement;
const listElement = document.getElementById("book-list") as HTMLUListElement;

interface SearchResult {
  status: string;
  total: string;
  books: Book[];
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  url: string;
}
async function fetchBooks(query: string): Promise<Book[]> {
  const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
  const data = (await response.json()) as SearchResult;

  return data.books;
}

formElement.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(formElement));
  const query = formData.query as string;
  const books = await fetchBooks(query);

  console.log(books);
});
