"use strict";
const formElement = document.getElementById("search-form");
const listElement = document.getElementById("book-list");
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
//# sourceMappingURL=main.js.map