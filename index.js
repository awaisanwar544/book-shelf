import Book from './modules/book.js';
import BooksList from './modules/bookList.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const favBooks = new BooksList();
// add event listner to newly added book remove button
let removeBtn = document.querySelectorAll('.remove');

const addEvents = () => {
  removeBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
      const ref = e.target.id;
      favBooks.removeBook(ref);
      e.target.parentElement.remove();
      localStorage.setItem('data', JSON.stringify(favBooks.storage));
    });
  });
};

// populate dom with the list

const addBtn = document.querySelector('#add-btn');

const populateDom = (list) => {
  const booksListDiv = document.querySelector('#books-list');
  for (let i = 0; i < list.length; i += 1) {
    const div = document.createElement('div');
    div.className = 'book';
    const pTitle = document.createElement('p');
    pTitle.innerHTML = `"${list[i].title}" by ${list[i].author}`;
    div.appendChild(pTitle);
    const btn = document.createElement('button');
    btn.className = 'remove';
    btn.innerHTML = 'Remove';
    btn.id = list[i].id;
    div.appendChild(btn);
    booksListDiv.appendChild(div);
  }
  removeBtn = document.querySelectorAll('.remove');
  addEvents();
};

const nav = (element, link) => {
  document.querySelector('.show').className = 'hidden';
  document.querySelector(element).className = 'show';
  document.querySelectorAll('a').forEach((item) => {
    item.className = '';
  });
  link.className = 'active';
};

// get input from form and call addToBooks method

const addNewBook = () => {
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  if (bookTitle && bookAuthor) {
    const newBook = new Book(bookTitle, bookAuthor);
    favBooks.addBook(newBook);
    populateDom([newBook]);
    document.querySelector('form').reset();
    const listLink = document.querySelector('#list-link');
    nav('#books', listLink);
    localStorage.setItem('data', JSON.stringify(favBooks.storage));
  }
};

addBtn.addEventListener('click', addNewBook);

document.querySelectorAll('a').forEach((item) => {
  const ref = item.getAttribute('href');
  item.addEventListener('click', () => {
    nav(ref, item);
  });
});

const dateTime = () => {
  const time = document.querySelector('.date');
  const now = DateTime.now();
  time.innerHTML = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

  setTimeout(dateTime, 1000);
};
dateTime();

window.onload = () => {
  if (localStorage.getItem('data') === null) {
    populateDom(favBooks.storage);
  } else {
    const localBooks = JSON.parse(localStorage.getItem('data'));
    populateDom(localBooks);
    favBooks.storage = localBooks;
  }
};