"use strict";
const formElement = document.getElementById("search-form");
const listElement = document.getElementById("book-list");
const helloButton = document.getElementById("helloBtn");
const helloMessage = document.getElementById("output");
const nameInput = document.getElementById("nameInput");
const submitButton = document.getElementById("submitBtn");
const nameParagraph = document.getElementById("displayName");
const toggleButton = document.getElementById("toggleBtn");
const hiddenText = document.getElementById("hiddenText");
const itemInput = document.getElementById("itemInput");
const listButton = document.getElementById("addBtn");
const ItemList = document.getElementById("itemList");
async function findBooks(query) {
    const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
    3;
    const data = await response.json();
    return data.books;
}
formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(formElement));
    const query = formData.query;
    const books = await findBooks(query);
    books.forEach((book) => {
        const card = getBookCard(book);
        const li = document.createElement("li");
        li.append(card);
        listElement.append(li);
    });
});
function getBookCard(data) {
    const article = document.createElement("article");
    article.innerHTML = `
    <h1>${data.title}</h1>
    <h2>${data.subtitle}</h2>
    <p>${data.authors}</p>
    `;
    return article;
}
helloButton.addEventListener("click", (event) => {
    helloMessage.innerText = "Hello from TypeScript!";
});
submitButton.addEventListener("click", (event) => {
    nameParagraph.innerText = nameInput.value;
});
toggleButton.addEventListener("click", (event) => {
    if (hiddenText.style.display == "") {
        hiddenText.style.display = "none";
    }
    else {
        hiddenText.style.display = "";
    }
});
function getListItem(input) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
  <p>${input}</p>
  <button type="button">delete</button>`;
    return listItem;
}
listButton.addEventListener("click", (event) => {
    const input = itemInput.value;
    ItemList.append(getListItem(input));
});
//# sourceMappingURL=main.js.map