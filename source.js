const showButton = document.getElementById('show-dialog');
const addDialog = document.getElementById('add-dialog');
const confirmBtn = document.querySelector('#add-book');
const cancelBrn = document.getElementById('cancel');
const form = document.querySelector('#add-book-form');
const cardGrid = document.querySelector('.card-grid');

const myLibrary = [];

function Book(title, author, yearPublished, numPages, wasRead, recommended) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.numPages = numPages;
    this.wasRead = wasRead;
    this.recommended = recommended;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

// 'Show-dialog" button opens the <dialog> modally
showButton.addEventListener('click', () => {
    addDialog.showModal();
});

// Closes dialog when user clicks outside of it
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
    const wasRead = form['was-read'].value;
    const recommended = form.recommended.value;

    const newBook = new Book(title, author, yearPublished, numPages, wasRead, recommended);
    addBookToLibrary(newBook);
    
    const newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');
    const newTitle = document.createElement('h4');
    newTitle.innerHTML = title;
    const newAuthor = document.createElement('span');
    newAuthor.innerHTML = author;
    const newNumPages = document.createElement('span');
    newNumPages.innerHTML = numPages;
    const wasReadSpan = document.createElement('span');
    wasReadSpan.innerHTML = 'Read: ';
    const newWasRead = document.createElement('span');
    newWasRead.setAttribute('class', 'was-read');
    newWasRead.innerHTML = wasRead;
    wasReadSpan.append(newWasRead);

    // Create data-attribute to relate newCard to index in myLibrary
    const bookIdx = document.createAttribute('book-index');
    bookIdx.value = myLibrary.length;

    const newRecommendedSpan = document.createElement('span');
    newRecommendedSpan.innerHTML = 'Recommended: ';
    const newRecommended = document.createElement('span');
    newRecommended.innerHTML = recommended;
    newRecommendedSpan.append(newRecommended);

    newCard.append(newTitle);
    newCard.append(newAuthor);
    newCard.append(newNumPages);
    newCard.append(wasReadSpan)
    newCard.append(newRecommendedSpan);
    newCard.setAttributeNode(bookIdx);
    cardGrid.appendChild(newCard)

    // cardGrid.appendChild(newCard);
  });