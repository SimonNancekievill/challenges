const formElement = document.getElementById("search-form") as HTMLFormElement;
const listElement = document.getElementById("book-list") as HTMLUListElement;
const helloButton = document.getElementById("helloBtn") as HTMLButtonElement;
const helloMessage = document.getElementById("output") as HTMLParagraphElement;

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

async function findBooks(query: string): Promise<Book[]> {
  const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
  3;
  const data = await response.json();
  return data.books as Book[];
}

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(formElement));
  const query = formData.query as string;
  const books = await findBooks(query);
  books.forEach((book) => {
    const card = getBookCard(book);
    const li = document.createElement("li");

    li.append(card);
    listElement.append(li);
  });
});

function getBookCard(data: Book): HTMLElement {
  const article = document.createElement("article");

  article.innerHTML = `
    <h1>${data.title}</h1>
    <h2>${data.subtitle}</h2>
    <p>${data.authors}</p>
    `;

  return article;
}

helloButton.addEventListener("click", (event: MouseEvent) => {
  helloMessage.innerText = "Hello from TypeScript!";
});
