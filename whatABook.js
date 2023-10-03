// Authors: Justin Barlowe, John Davidson, Jocelyn Dupuis
// Name: whatabook_dbinit.js
// Description: Database initialization file for WhatABook application.
// Date: 9/25/2023

// Connect to WhatABook DB via mongosh using:
// mongosh "mongodb+srv://bellevueuniversity.w2mknhu.mongodb.net/" --apiVersion 1 --username whatabook_admin
// Password: s3cret

// Create database if it doesn't exist
db = db.getSiblingDB('WhatABook');

// Drop existing collections
db.books.drop();
db.customers.drop();
db.wishlistitems.drop();

// Create the books collection using document validation.
db.createCollection("books", {
  validator: { $jsonSchema: {
      bsonType: "object",
      properties: {
          bookId: { bsonType: "string" },
          title: { bsonType: "string" },
          genre: { bsonType: "string" },
          author: { bsonType: "string" }
      }
  }}
});

// Create the customers collection using document validation.
db.createCollection("customers", {
  validator: { $jsonSchema: {
      bsonType: "object",
      properties: {
          customerId: { bsonType: "string" },
          firstName: { bsonType: "string" },
          lastName: { bsonType: "string" }
      }
  }}
});

// Create the wishlist collection using document validation.
db.createCollection("wishlistitems", {
  validator: { $jsonSchema: {
      bsonType: "object",
      properties: {
          customerId: { bsonType: "string" },
          bookId: {
              bsonType: "array",
              items: { bsonType: "string" }
          }
      }
  }}
});
// Create books collection and populate books
db.books.insertMany([
  {'bookId': 'b1001', 'title': 'Sorcerer\'s Stone', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1002', 'title': 'Chamber of Secrets', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1003', 'title': 'Prisoner of Azkaban', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1004', 'title': 'Goblet of Fire', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1005', 'title': 'Order of the Phoenix', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1006', 'title': 'Half-Blood Prince', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1007', 'title': 'Deathly Hallows', 'genre': 'Fantasy', 'author': 'J.K. Rowling'},
  {'bookId': 'b1008', 'title': 'The Fellowship of the Ring', 'genre': 'Fantasy', 'author': 'J.R.R. Tolkien'},
  {'bookId': 'b1009', 'title': 'The Two Towers', 'genre': 'Fantasy', 'author': 'J.R.R. Tolkien'},
  {'bookId': 'b1010', 'title': 'The Return of the King', 'genre': 'Fantasy', 'author': 'J.R.R. Tolkien'},
  {'bookId': 'b1011', 'title': 'Darkly Dreaming Dexter', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1012', 'title': 'Dearly Devoted Dexter', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1013', 'title': 'Dexter in the Dark', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1014', 'title': 'Dexter by Design', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1015', 'title': 'Dexter is Delicious', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1016', 'title': 'Double Dexter', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1017', 'title': 'Dexter\'s Final Cut', 'genre': 'Thriller', 'author': 'Jeff Lindsay'},
  {'bookId': 'b1018', 'title': 'Dexter is Dead', 'genre': 'Thriller', 'author': 'Jeff Lindsay'}
]);

// Create customers collection and populate customers
db.customers.insertMany([
  {'customerId': 'c1001', 'firstName': 'Justin', 'lastName': 'Barlowe'},
  {'customerId': 'c1002', 'firstName': 'John', 'lastName': 'Davidson'},
  {'customerId': 'c1003', 'firstName': 'Jocelyn', 'lastName': 'Dupuis'},
  {'customerId': 'c1004', 'firstName': 'Richard', 'lastName': 'Krasso'},
  {'customerId': 'c1005', 'firstName': 'John', 'lastName': 'Smith'}
]);

// Create wishlist collection and populate wishlist items
db.wishlistitems.insertMany([
  {'customerId': 'c1001', 'bookId': [ 'b1001', 'b1002', 'b1003', 'b1004', 'b1005' ]},
]);

print("Database initialized.");