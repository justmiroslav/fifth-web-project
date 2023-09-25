class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = !this.isRead;
    }
    
    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf {
    constructor(books) {
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
        updateTotalBooksCount();
    }

    removeBook(book) {
        this.books = this.books.filter(b => b !== book);
        updateTotalBooksCount();
    }

    getUnreadBooks() {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter(book => book.isFavorite);
    }
}

const shelf = new Bookshelf([]);

function updateTotalBooksCount() {
    const totalAmountElement = document.getElementById("total-amount");
    totalAmountElement.textContent = `Total amount of books: ${shelf.books.length}`;
}

const alertNumUnreadBtn = document.getElementById("alert-num-unread");
const alertNumFavBtn = document.getElementById("alert-num-fav");

alertNumUnreadBtn.addEventListener('click', () => {
    const unreadCount = shelf.getUnreadBooks().length;
    alert(`Number of unread books: ${unreadCount}`);
});

alertNumFavBtn.addEventListener('click', () => {
    const favCount = shelf.getFavBooks().length;
    alert(`Number of favorite books: ${favCount}`);
});

const addBookBtn = document.getElementById("add-book");
addBookBtn.addEventListener('click', () => {
    const titleInput = document.getElementById("input-title").value;
    const authorsInput = document.getElementById("input-authors").value;
    const pagesInput = document.getElementById("input-num-of-pages").value;

    if (titleInput === "" || authorsInput === "" || pagesInput === "") {
        alert("Before adding the book, make sure you have filled in all the fields");
    } else {
        const book = new Book(titleInput, authorsInput, pagesInput, false, false);
        shelf.addBook(book);

        const shelfElement = document.createElement("div");
        shelfElement.classList.add("shelf-element");

        shelfElement.innerHTML = `
            <div class="book-info">
                <p class="title">Title: '${book.title}'</p>
                <p class="authors">Authors: ${book.authors}</p>
                <p class="pages">Pages: ${book.numberOfPages}</p>
                <p class="is-read">IsRead: ${book.isRead}</p>
                <p class="favorite">Favorite: ${book.isFavorite}</p>
            </div>
            <div class="change-book-info">
                <button class="toggle-is-read">Toggle IsRead</button>
                <button class="toggle-favorite">Toggle Favorite</button>
                <button class="remove-book">Remove book from the shelf</button>
            </div>
        `;

        const leftPart = document.querySelector(".left-part");
        leftPart.appendChild(shelfElement);

        document.getElementById("input-title").value = "";
        document.getElementById("input-authors").value = "";
        document.getElementById("input-num-of-pages").value = "";

        const toggleIsRead = shelfElement.querySelector(".toggle-is-read");
        const toggleFavorite = shelfElement.querySelector(".toggle-favorite");
        const removeBook = shelfElement.querySelector(".remove-book");

        toggleIsRead.addEventListener('click', () => {
            book.markAsRead();
            shelfElement.querySelector(".is-read").textContent = `IsRead: ${book.isRead}`;
        });

        toggleFavorite.addEventListener('click', () => {
            book.toggleFavorite();
            shelfElement.querySelector(".favorite").textContent = `Favorite: ${book.isFavorite}`;
        });

        removeBook.addEventListener('click', () => {
            shelf.removeBook(book);
            leftPart.removeChild(shelfElement);
        });
    } 
});
