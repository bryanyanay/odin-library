const Library = (function() {
    const booksDOM = document.getElementsByClassName("books")[0];
    const books = [];

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    function createBookDOM(index) {
        const book = books[index];
        const bookDOM = document.createElement("div");
        bookDOM.className = "book card";
        bookDOM.setAttribute("data-library-index", index);

        function ewt(tagName, text) {
            // for "element with text"
            const element = document.createElement(tagName);
            element.textContent = text;
            return element;
        }
        bookDOM.appendChild(ewt("h3", book.title));
        bookDOM.appendChild(ewt("p", `by ${book.author}`));
        bookDOM.appendChild(ewt("p", `${book.pages} pages`));
        
        const readOrNot = ewt("p", (book.read)?"Already read!":"Not read yet!");
        readOrNot.className = "read-or-not";
        readOrNot.onclick = (e) => {
            toggleRead(e.target.parentNode.getAttribute("data-library-index"), e.target);
        }
        bookDOM.appendChild(readOrNot);

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.innerHTML = `<img src="close.svg" alt="close icon">`;
        closeBtn.onclick = (e) => {
            // we need currentTarget, since the target may be the img inside the button
            removeBook(e.currentTarget.parentNode.getAttribute("data-library-index")); // we can't just use the index parameter, since the index might change (see removeBook)
        }
        bookDOM.appendChild(closeBtn);

        return bookDOM;
    }
    function addBook(title, author, pages, read) {
        books.push(new Book(title, author, pages, read));
        booksDOM.insertBefore(createBookDOM(books.length - 1), document.querySelector(".add-book-btn"));
    }
    function removeBook(index) {
        books.splice(index, 1);
        document.querySelector(`.book[data-library-index="${index}"]`)
            .remove();
        
        Array.from(booksDOM.children).slice(index)
            .forEach((book) => { 
                book.setAttribute("data-library-index", book.getAttribute("data-library-index") - 1);
            });
    }
    function toggleRead(index, textContainer) {
        books[index].read = !books[index].read;
        textContainer.textContent = (books[index].read) ? "Already read!":"Not read yet!";
    }

    return {
        addBook,
    };
})();

const obscure = document.getElementsByClassName("obscure")[0];
const addBookBtn = document.getElementsByClassName("add-book-btn")[0];
const addBookModal = document.getElementsByClassName("add-book-modal")[0];

function clearAddBookModal() {
    document.querySelectorAll('.add-book-modal input[type="text"], .add-book-modal input[type="number"]')
        .forEach((input) => { input.value = ""; });
    document.querySelector('.add-book-modal input[type="checkbox"]').checked = false;
}
function showAddBookModal() {
    obscure.classList.add("showing");
    addBookModal.classList.add("showing");
}
function hideAddBookModal() {
    if (!addBookModal.classList.contains("showing")) return;
    obscure.classList.remove("showing");
    addBookModal.classList.remove("showing");
}
function getBookInfo() {
    const inputs = Array.from(document.querySelectorAll(".add-book-modal input"));
    return inputs.slice(0, 3).map((ipt) => ipt.value) 
        .concat([inputs[3].checked]);
}

addBookBtn.onclick = showAddBookModal;
obscure.onclick = hideAddBookModal;

// add button on the add book modal
document.querySelector(".add-book-modal button").onclick = () => { 
    Library.addBook(...getBookInfo()); 
    hideAddBookModal();
    clearAddBookModal();
};







