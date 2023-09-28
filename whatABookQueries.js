// Author: Justin Barlowe, John Davidson, Jocelyn Dupuis
// Name: barlowe-davidson-dupuis-whatabook.js
// Description: This file contains the MongoDB queries for the WhatABook application.
// Date: 9/25/2023

// Query to display a list of books
db.books.find()

// Query to display a list of books by genre
db.books.find({ genre: 'Fantasy' })

// Query to display a list of books by author
db.books.find({ author: 'J.R.R. Tolkien' })

// Query to display a book by bookID
db.books.findOne({ bookId: 'b1004' })

// Query to display a wishlist by customerId
db.wishlistitems.findOne({ customerId: 'c1001' })

// Query to add multiple books to a customer's wishlist
db.wishlistitems.updateOne({ customerId: 'c1001'}, {$addToSet: { bookId: { $each: ['b1002', 'b1005']}}})

// Query to remove a book from a customer's wishlist
db.wishlistitems.updateOne({ customerId: 'c1001'}, {$pull: { bookId: 'b1002' }})






