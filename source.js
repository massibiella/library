const myLibrary = [];

function Book(title, author, yearPublished, numPages, wasRead) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.numPages = numPages;
    this.wasRead = wasRead;
}

function addBookToLibrary() {
    
}

const showButton = document.getElementById('show-dialog');
const addDialog = document.getElementById('add-dialog');
const confirmBtn = document.querySelector('#add-book');
const cancelBrn = document.getElementById('cancel');
const form = document.querySelector('#add-book-form');
const cardGrid = document.querySelector('card-grid');

// 'Show-dialog" button opens the <dialog> modally
showButton.addEventListener('click', () => {
    addDialog.showModal();
});

function onClick(event) {
    if (event.target === addDialog) {
      addDialog.close();
    }
  }

addDialog.addEventListener('click', onClick);
cancelBrn.addEventListener('click', () => {
    addDialog.close();
})

form.addEventListener("submit", (event) => {
    const author = form.author.value;
    const title = form.title.value;
    const yearPublished = parseInt(form['year-published'].value);
    const numPages = parseInt(form['num-pages'].value);
    const wasReas = parseBoolean(form['was-read'].value);
    const recommended = parseBoolean(form.recommended.value);
    // const newCard = 
    // cardGrid.appendChild(newCard);
  });