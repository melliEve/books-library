const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. Create a schema for a book
let bookSchema = new Schema({
  "author": String,
  "country": String,
  "image": String,
  "language": String,
  "link": String,
  "pages": Number,
  "title": String,
  "year": Number
});

// 2. Create a class with methods/or getters/setters
//    that every books should have

class BookClass {

  get age() {
    let currentYear = new Date().getFullYear();
    return currentYear - this.year;
  }

}

// 3. Create the model and export it
bookSchema.loadClass(BookClass);
module.exports = db.model('Book', bookSchema);
