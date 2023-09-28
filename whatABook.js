// Authors: Justin Barlowe, John Davidson, Jocelyn Dupuis
// Name: whatabook_dbinit.js
// Description: Database initialization file for WhatABook application.
// Date: 9/25/2023

//Delete the books, customers, and wishlist collections.
db.books.drop()
db.customers.drop()
db.wishlist.drop()

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
})

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
})

// Create the wishlist collection using document validation.
db.createCollection("wishlist", {
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
})


// Books.
Book1 = {
    "bookId": "b001",
    "title": "Fellowship of the Ring",
    "genre": "Fantasy",
    "author": "J.R.R. Tolkien"
}

Book2 = {
    "bookId": "b002",
    "title": "The Two Towers",
    "genre": "Fantasy",
    "author": "J.R.R. Tolkien"
}

Book3 = {
    "bookId": "b003",
    "title": "The Return of the King",
    "genre": "Fantasy",
    "author": "J.R.R. Tolkien"
}

Book4 = {
    "bookId": "b004",
    "title": "The Book of Lost Tales",
    "genre": "Fantasy",
    "author": "J.R.R. Tolkien"
}

Book5 = {
    "bookId": "b005",
    "title": "The Hobbit",
    "genre": "Fantasy",
    "author": "J.R.R. Tolkien"
}

Book6 = {
    "bookId": "b006",
    "title": "The Road Goes Ever On",
    "genre": "Fantasy",
    "author": "J.R.R. Tolkien"
}

// Insert book documents.
db.books.insertOne(Book1)
db.books.insertOne(Book2)
db.books.insertOne(Book3)
db.books.insertOne(Book4)
db.books.insertOne(Book5)
db.books.insertOne(Book6)

Customer1 = {
    "customerId": "c001",
    "firstName": "John",
    "lastName": "Smith"
}

Customer2 = {
    "customerId": "c002",
    "firstName": "Patrick",
    "lastName": "Eliis"
}

Customer3 = {
    "customerId": "c003",
    "firstName": "Samantha",
    "lastName": "Thorn"
}

db.customers.insertOne(Customer1)
db.customers.insertOne(Customer2)
db.customers.insertOne(Customer3)

Wishlist1 = {
    "customerId": "c001",
    "bookId": [ "b001", "b003" ]   
}

Wishlist2 = {
    "customerId": "c002",
    "bookId": [ "b001", "b003", "b006" ]   
}

Wishlist3 = {
    "customerId": "c003",
    "bookId": [ "b004", "b006" ]   
}

db.wishlist.insertOne(Wishlist1)
db.wishlist.insertOne(Wishlist2)
db.wishlist.insertOne(Wishlist3)






