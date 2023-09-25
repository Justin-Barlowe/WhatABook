# Authors: Justin Barlowe, John Davidson, Jocelyn Dupuis
# Name: whatabook-app.py
# Description: Main python file for the WhatABook application.
# Date: 9/25/2023

# Import pymongo so we can connect to MongoDB
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://whatabook_admin:s3cret@bellevueuniversity.w2mknhu.mongodb.net/?retryWrites=true&w=majority')
db = client['WhatABook']

# Display books function
def display_books():
    print("--- Displaying Books ---")
    books = db.books.find()
    # Loop through the books collection and display the title and author.
    for book in books:
        print(f"Title: {book['title']}, Author: {book['author']}")

# Display books by genre function
def display_books_by_genre():
    # User input for genre to filter by.
    genre = input("Enter genre to filter by: (Fantasy, Thriller, ect.) ")
    print(f"--- Displaying Books in {genre} genre ---")
    books = db.books.find({"genre": genre})
    for book in books:
        print(f"Title: {book['title']}, Author: {book['author']}")

# Search books by Author
def search_books_by_author():
    # User input for author to search by.
    author = input("Enter author to search by: ")
    print(f"--- Displaying Books by {author} ---")
    # Search the books collection for the author and display the title and author.
    books = db.books.find({"author": author})
    for book in books:
        print(f"Title: {book['title']}, Author: {book['author']}")

# Display book by bookID
def display_book_by_id():
    # User input for book ID to search by.
    book_id = input("Enter book ID: ")
    # Search the books collection for the book ID and display the title and author.
    book = db.books.find_one({"bookId": book_id})
    print(f"Title: {book['title']}, Author: {book['author']}")

# Add books to wishlist
def add_book_to_wishlist():
    # User input for customer ID and book ID to add to wishlist.
    customer_id = input("Enter customer ID: ")
    book_id = input("Enter book ID: ")
    wishlist_item = {
        "customerId": customer_id,
        "bookId": book_id
    }
    # Insert the wishlist item into the wishlistitems collection.
    db.wishlistitems.insert_one(wishlist_item)
    print("Book added to wishlist!")

# Display wishlist by customer ID function
def display_wishlist_by_customer():
    customer_id = input("Enter the customer ID (e.g., c1007): ")
    # Joining the wishlistitems and books collections on with book ID for better formatted response, rather than just book ID.
    pipeline = [
        {
            '$match': {'customerId': customer_id}
        },
        {
            '$lookup': {
                'from': 'books',
                'localField': 'bookId',
                'foreignField': 'bookId',
                'as': 'book_info'
            }
        },
        {
            '$unwind': '$book_info'
        }
    ]
    wishlist_items = db.wishlistitems.aggregate(pipeline)
    
    # Count the number of wishlist items for the customer ID, if there are none then return message.
    count = db.wishlistitems.count_documents({'customerId': customer_id})
    if count == 0:
        print("No wishlist items found for customer ID:", customer_id)
    # Display the wishlist items for the customer ID.
    else:
        print(f"Wishlist items for customer ID: {customer_id}")
        for item in wishlist_items:
            print(f"Book Title: {item['book_info']['title']}, Author: {item['book_info']['author']}")

# Main application function
def main():
    # Options for the user to select from.
    while True:
        print("\n--- Welcome to WhatABook! ---")
        print("Please select an option below:")
        print("1: Display Books")
        print("2: Display Books by Genre")
        print("3: Search Books by Author")
        print("4: Display book by book ID")
        print("5: Add book to wishlist")
        print("6: Display Wishlist by Customer ID")
        print("7: Exit")
        
        # User input for choice.
        choice = input("Enter choice: ")
        
        # If else statements for user input.
        if choice == "1":
            display_books()
        elif choice == "2":
            display_books_by_genre()
        elif choice == "3":
            display_wishlist_by_customer()
        elif choice == "4":
            display_book_by_id()
        elif choice == "5":
            search_books_by_author()
        elif choice == "6":
            add_book_to_wishlist()
        elif choice == "7":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, please try again.")

# Call main function
if __name__ == "__main__":
    main()
