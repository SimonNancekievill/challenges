"use strict";
const formElement = document.getElementById("search-form");
const listElement = document.getElementById("book-list");
async function fetchBooks(query) {
    const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
    const data = (await response.json());
    return data.books;
}
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(formElement));
    const query = formData.query;
    const books = await fetchBooks(query);
    console.log(books);
});
//# sourceMappingURL=main.js.map