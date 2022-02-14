export default class BooksList {
  constructor() {
    this.storage = [];
  }

  addBook(book) {
    this.storage.push(book);
    this.size += 1;
  }

  removeBook(bookId) {
    this.storage = this.storage.filter((item) => item.id !== bookId);
  }
}