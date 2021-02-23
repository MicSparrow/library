let library;
const DEFAULT_DATA = [{
  name: "The Lord of the Rings",
  author: "Tolkien",
  status: "read"
}, ];
const BookTitle = document.querySelector(".book");
const BookAuthor = document.querySelector(".author");
const BookStatus = document.querySelector(".status");
const TableBody = document.querySelector(".table-body");
const Form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  clearForm();
});

const Table = document.querySelector("table").addEventListener("click", (e) => {
  const currentTarget = e.target.parentNode.parentNode.childNodes[1];
  if (e.target.innerHTML == "delete") {
    if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
      deleteBook(findBook(library, currentTarget.innerText));
  }
  if (e.target.classList.contains("status-button")) {
    changeStatus(findBook(library, currentTarget.innerText));
  }
  updateLocalStorage();
  render();
});

class Book {
  constructor(booktitle, author, status) {
    this.booktitle = booktitle;
    this.author = author;
    this.status = status;
  }
}

function addBookToLibrary() {
  if (BookTitle.value.length === 0 || BookAuthor.value.length === 0) {
    alert("Field cannot be empty!");
    return;
  }
  const newBook = new Book(BookTitle.value, BookAuthor.value, BookStatus.value);

  library.push(newBook);
  updateLocalStorage();
}

function changeStatus(book2) {
  if (library[book2].status === "read") {
    library[book2].status = "not read";
  } else library[book2].status = "read";
}

function deleteBook(currentBook) {
  library.splice(currentBook, currentBook + 1);
}

function findBook(libraryArray, booktitle) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (let book2 of libraryArray)
    if (book2.booktitle === booktitle) {
      return libraryArray.indexOf(book2);
    }
}

function clearForm() {
  BookTitle.value = "";
  BookAuthor.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
  //library = JSON.parse(localStorage.getItem("library"));
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  } else {
    library = DEFAULT_DATA;
  }
}

function render() {
  checkLocalStorage();
  TableBody.innerHTML = "";
  library.forEach((book2) => {
    const htmlBook = `
      <tr>
        <td>${book2.booktitle}</td>
        <td>${book2.author}</td>
        <td><button class="status-button">${book2.status}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
      `;
    TableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
}

render();
