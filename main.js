showBooks();

function showBooks() {

    var completeBookshelfList = document.getElementById('completeBookshelfList')
    completeBookshelfList.innerHTML = ''
    var incompleteBookshelfList = document.getElementById('incompleteBookshelfList')
    incompleteBookshelfList.innerHTML = ''

    bookList = JSON.parse(localStorage.getItem('books')) ?? []
    bookList.forEach(book => {
        if (book.isComplete == true) {
            var completeBookshelfList = document.getElementById('completeBookshelfList')
            completeBookshelfList.innerHTML += `
            <article class="book_item input" id="${book.id}">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
            
                <div class="action">
                    <button class="yellow" onclick="editBook(${book.id})">Edit Buku</button>
                    <button class="green" onclick="swap(${book.id})">Belum selesai di Baca</button>
                    <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
                </div>
            </article>
            `
        }
        else {
            var incompleteBookshelfList = document.getElementById('incompleteBookshelfList')

            incompleteBookshelfList.innerHTML += `
            <article class="book_item input" id="${book.id}">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
        
                <div class="action">
                    <button class="yellow" onclick="editBook(${book.id})">Edit Buku</button>
                    <button class="green" onclick="swap(${book.id})">Selesai dibaca</button>
                    <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
                </div>
            </article>
            `
        }
    });
}


function addBook() {

    bookList = JSON.parse(localStorage.getItem('books')) ?? []

    var book = {
        id: +new Date(),
        title: document.getElementById('inputBookTitle').value,
        author: document.getElementById('inputBookAuthor').value,
        year: document.getElementById('inputBookYear').value,
        isComplete: document.getElementById('inputBookIsComplete').checked
    }

    bookList.push(book);

    localStorage.setItem('books', JSON.stringify(bookList))
    bookList = []
}

function searchBooks(event) {
    event.preventDefault();

    title = document.getElementById('searchBookTitle').value

    bookList = JSON.parse(localStorage.getItem('books')) ?? []

    var completeBookshelfList = document.getElementById('completeBookshelfList')
    completeBookshelfList.innerHTML = ''
    var incompleteBookshelfList = document.getElementById('incompleteBookshelfList')
    incompleteBookshelfList.innerHTML = ''

    bookList.forEach(book => {
        if (book.title == title)
            if (book.isComplete == true) {
                completeBookshelfList.innerHTML += `
                <article class="book_item input" id="${book.id}">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                
                    <div class="action">
                        <button class="green" onclick="swap(${book.id})">Belum selesai di Baca</button>
                        <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
                    </div>
                </article>
            `
            }
            else {
                incompleteBookshelfList.innerHTML += `
                <article class="book_item input" id="${book.id}">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
            
                    <div class="action">
                    <button class="green" onclick="swap(${book.id})">Selesai dibaca</button>
                    <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
                    </div>
                </article>
            `
            }
    })

}

function removeBook(id) {
    completeBookList = JSON.parse(localStorage.getItem('books')) ?? []

    bookList = bookList.filter(function (value) {
        return value.id != id;
    });

    localStorage.setItem('books', JSON.stringify(bookList))

    showBooks()
}

function swap(id) {

    bookList = JSON.parse(localStorage.getItem('books')) ?? []

    bookList.forEach(book => {
        if (book.id == id)
            book.isComplete = !book.isComplete
    })

    localStorage.setItem('books', JSON.stringify(bookList))

    showBooks()
}

function editBook(id) {
    editedBook = document.getElementById(id)

    bookList = JSON.parse(localStorage.getItem('books')) ?? []

    bookList.forEach(book => {
        if (book.id == id) {
            editedBook.innerHTML = `
                <label for="edit-title">Title :</label><br>
                <input type="text" id="edit-title" value="${book.title}"><br>
                <label for="edit-author">Author :</label><br>
                <input type="text" id="edit-author" value="${book.author}"><br>
                <label for="edit-year">Year :</label><br>
                <input type="number" id="edit-year" value="${book.year}"><br>
                <br>
                <div class="action edit">
                <button onclick="saveBook(${book.id})">Simpan Buku</button>
                </div>    
            `
        }
    })
}

function saveBook(id) {
    editedBook = document.getElementById(id)

    bookList = JSON.parse(localStorage.getItem('books')) ?? []

    bookList.forEach(book => {
        if (book.id == id) {
            console.log(document.getElementById('edit-title').value)
            book.title = document.getElementById('edit-title').value
            book.author = document.getElementById('edit-author').value
            book.year = document.getElementById('edit-year').value
        }
    })

    localStorage.setItem('books', JSON.stringify(bookList))

    showBooks()
}

