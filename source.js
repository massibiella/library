const showButton = document.getElementById('show-dialog');
const addDialog = document.getElementById('add-dialog');
const confirmBtn = document.querySelector('#add-book');
const cancelBrn = document.getElementById('cancel');
const form = document.querySelector('#add-book-form');
const cardGrid = document.querySelector('.card-grid');
const percentageRead = document.querySelector('.perc-read');

const myLibrary = [];

function Book(title, author, yearPublished, numPages, wasRead, recommended) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.numPages = numPages;
    this.wasRead = wasRead;
    this.recommended = recommended;
}

function updatePercentageRead() {
  const numRead = myLibrary.filter((obj) => obj.wasRead === 'Yes').length;
  const updatedPercentage = (numRead / myLibrary.length) * 100;
  percentageRead.textContent = Math.round(updatedPercentage) + ' %'
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    updatePercentageRead();
};

function toggleBookRead(target, bookIdx) {
  if (myLibrary[bookIdx].wasRead === 'No')
    myLibrary[bookIdx].wasRead = 'Yes';
  else
    myLibrary[bookIdx].wasRead ='No';

    // Update card with new value
    const wasRead = target.parentElement.querySelector('.was-read');
    wasRead.textContent =  myLibrary[bookIdx].wasRead;
}

// Closes dialog when user clicks outside of it
function onClick(event) {
  if (event.target === addDialog) {
    addDialog.close();
  }
}

function removeBook(event) {
  // Grab book-index of card clicked, remove it from DOM and myLibrary
  const bookIdx = event.target.parentElement.parentElement.getAttribute('book-index');
  const cardToRemove = event.target.parentElement.parentElement;
  cardGrid.removeChild(cardToRemove);
  myLibrary.splice(bookIdx, 1);
  updatePercentageRead();
}

// 'Show-dialog" button opens the <dialog> modally
showButton.addEventListener('click', () => {
    addDialog.showModal();
});

addDialog.addEventListener('click', onClick);
cancelBrn.addEventListener('click', () => {
    addDialog.close();
})

form.addEventListener("submit", (event) => {
  const removeSvg = '<svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><title>book-remove-multiple</title><path fill="currentColor" d="M13.09 20H5V6H3V20A2 2 0 0 0 5 22H13.81A5.5 5.5 0 0 1 13.09 20M19 2H14V7L12 5.5L10 7V2H9A2 2 0 0 0 7 4V16A2 2 0 0 0 9 18H13.09A6 6 0 0 1 21 13.34V4A2 2 0 0 0 19 2M22.54 16.88L20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.46 21.12L17.59 19L15.46 16.88L16.88 15.46L19 17.59L21.12 15.46Z" />'
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
    const topCardRow = document.createElement('div');
    topCardRow.setAttribute('class', 'card-top-row');
    const newTitle = document.createElement('h4');
    newTitle.innerHTML = title;
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = removeSvg;
    removeBtn.addEventListener('click', removeBook);
    removeBtn.setAttribute('class', 'remove-book');
    topCardRow.appendChild(newTitle);
    topCardRow.appendChild(removeBtn);
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
    bookIdx.value = myLibrary.length - 1;

    const newRecommendedSpan = document.createElement('span');
    newRecommendedSpan.innerHTML = 'Recommended: ';
    const newRecommended = document.createElement('span');
    newRecommended.innerHTML = recommended;
    newRecommendedSpan.append(newRecommended);

    // Create 'toggle read' button
    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'Toggle Read';
    toggleReadBtn.setAttribute('class', 'toggle-read');

    newCard.append(topCardRow)
    newCard.append(newAuthor);
    newCard.append(newNumPages);
    newCard.append(wasReadSpan);
    newCard.append(newRecommendedSpan);
    newCard.append(toggleReadBtn);
    newCard.setAttributeNode(bookIdx);
    cardGrid.appendChild(newCard);

    toggleReadBtn.addEventListener('click', (event) => {
      const bookIdx =  parseInt(event.target.parentElement.getAttribute('book-index'));
      toggleBookRead(event.target,bookIdx);
    })
  });  