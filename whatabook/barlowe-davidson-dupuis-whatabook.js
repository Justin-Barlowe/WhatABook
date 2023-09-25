// Author: Justin Barlowe, John Davidson, Jocelyn Dupuis
// Name: barlowe-davidson-dupuis-whatabook.js
// Description: This file contains the MongoDB queries for the WhatABook application.
// Date: 9/25/2023


// Query to display a list of books
db.books.find()

// Query to display a list of books by genre
db.books.find({"genre": genre}) 

// Query to display a list of books by author
db.books.find({"author": author})

// Query to display a book by bookID
db.books.find_one({"bookId": book_id})


