// This program needs to be run once
// to import our book data from JSON to MongoDB

const mongoose = require('mongoose');

// Connect to db
let dbName = 'famous_books'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
  importJsonDataToDb();
});

// Load the Mongoose model for a Book
let Book = require('./Book');

// Load the json data from file
let bookData = require('./books.json');

async function importJsonDataToDb() {
  let allBooksCount = await Book.count();
  // if the db already contains books then delete them
  if (allBooksCount > 0) {
    console.log('Deleted old books', await Book.remove({}));
  }
  for (let data of bookData) {
    let book = new Book(data);
    // save the book to MongoDB
    await book.save();
  }
  // after the import count the books again
  allBooksCount = await Book.count();
  console.log(`Imported ${allBooksCount} books to the database`);
  // Exit the app
  process.exit();
}