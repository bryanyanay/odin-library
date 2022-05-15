

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function() {
    return `${this.title}, by ${this.author}, ${this.pages}, ${(this.read)?"already read":"not read yet"}`;
}

const obscure = document.getElementsByClassName("obscure")[0];
const addBookBtn = document.getElementsByClassName("add-book-btn")[0];
const addBookModal = document.getElementsByClassName("add-book-modal")[0];

console.log(addBookBtn);

function showAddBookModal() {
    obscure.classList.add("showing");
    addBookModal.classList.add("showing");
}
function hideAddBookModal() {
    obscure.classList.remove("showing");
    addBookModal.classList.remove("showing");
}

addBookBtn.onclick = showAddBookModal;
obscure.onclick = () => {
    if (obscure.classList.contains("showing")) {
        hideAddBookModal();
    }
};





