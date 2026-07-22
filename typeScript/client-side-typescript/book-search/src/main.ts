const formElement = document.getElementById("search-form") as HTMLFormElement;
const listElement = document.getElementById("book-list") as HTMLUListElement;
const helloButton = document.getElementById("helloBtn") as HTMLButtonElement;
const helloMessage = document.getElementById("output") as HTMLParagraphElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const submitButton = document.getElementById("submitBtn") as HTMLButtonElement;
const nameParagraph = document.getElementById(
  "displayName",
) as HTMLParagraphElement;
const toggleButton = document.getElementById("toggleBtn") as HTMLButtonElement;
const hiddenText = document.getElementById(
  "hiddenText",
) as HTMLParagraphElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const listButton = document.getElementById("addBtn") as HTMLButtonElement;
const ItemList = document.getElementById("itemList") as HTMLUListElement;
const decreaseButton = document.getElementById(
  "decreaseBtn",
) as HTMLButtonElement;
const counter = document.getElementById("counter") as HTMLSpanElement;
const increaseButton = document.getElementById(
  "increaseBtn",
) as HTMLButtonElement;
const colorBox = document.getElementById("colorBox") as HTMLDivElement;
const colorSelect = document.getElementById("colorSelect") as HTMLSelectElement;
const charCount = document.getElementById("charCount") as HTMLParagraphElement;
const textArea = document.getElementById("textInput") as HTMLTextAreaElement;

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

submitButton.addEventListener("click", (event: MouseEvent) => {
  nameParagraph.innerText = nameInput.value;
});

toggleButton.addEventListener("click", (event: MouseEvent) => {
  if (hiddenText.style.display == "") {
    hiddenText.style.display = "none";
  } else {
    hiddenText.style.display = "";
  }
});

function getListItem(input: string) {
  const listItem = document.createElement("li");
  const text = document.createElement("p");
  text.innerText = input;
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.innerText = "delete";

  deleteButton.addEventListener("click", (event: MouseEvent) => {
    listItem.remove();
  });
  listItem.append(text, deleteButton);
  return listItem;
}
listButton.addEventListener("click", (event: MouseEvent) => {
  const input = itemInput.value;
  ItemList.append(getListItem(input));
});

let count: number = 0;

increaseButton.addEventListener("click", (event: MouseEvent) => {
  count++;
  counter.innerHTML = `
  ${count}
  `;
});
decreaseButton.addEventListener("click", (event: MouseEvent) => {
  count--;
  counter.innerHTML = `
  ${count}
  `;
});

colorSelect.addEventListener("change", (event: Event) => {
  colorBox.style.backgroundColor = colorSelect.value;
});

textArea.addEventListener("input", (event: Event) => {
  const length = textArea.value.length;
  charCount.textContent = `${length} characters`;
});
