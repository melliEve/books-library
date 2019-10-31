const express = require('express');
const mongoose = require('mongoose');

// Connect to db
let dbName = 'famous_books'
mongoose.connect(`mongodb://localhost/${dbName}`);
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
  console.log('Connected to DB');
  startWebServer();
});

// Import our Book mongoose model
const Book = require('./Book');

function startWebServer(){
  
  // Create a web server
  const app = express();

  // A route that returns all books from Mongo
  app.get('/json/books', async (req, res) => {
    let books = await Book.find();
    res.json(books);
  });

  app.get('/json/books/:id', async(req,res) => {
      let book = await Book.findOne({_id: req.params.id}).catch((err)=>{
        // Catching here to prevent server crash
        // if cast to object id for id fails
        res.json({error: err});
      });
      res.json(book !== null ? book : {error: 'No such book'});
  });


  // Start the web server
  app.listen(3000, () => console.log('Listening on port 3000'));
}