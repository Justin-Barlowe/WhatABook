# Authors: Justin Barlowe, John Davidson, Jocelyn Dupuis
# Name: whatabook-app.py
# Description: Main python file for the WhatABook application.
# Date: 9/25/2023
# Last modified: 10/3/2023

# Import pymongo so we can connect to MongoDB
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://whatabook_admin:s3cret@bellevueuniversity.w2mknhu.mongodb.net/?retryWrites=true&w=majority')
db = client['WhatABook']

# Display books function
def display_books():
    print("\n" + "-"*25 + " Displaying Books " + "-"*25)
    books = db.books.find()
    for book in books:
        print(f"Title: {book['title']}, Author: {book['author']}, Book ID: {book['bookId']}")
    input("Press any key to continue...")

# Display books by genre function
def display_books_by_genre():
    genre = input("Enter genre to filter by: (Fantasy, Thriller, etc.) ")
    print("\n" + "-"*25 + f" Displaying Books in {genre} Genre " + "-"*25)
    books = db.books.find({"genre": genre})
    for book in books:
        print(f"Title: {book['title']}, Author: {book['author']}")
    input("Press any key to continue...")

# Search books by Author
def search_books_by_author():
    author = input("Enter author to search by: ")
    print("\n" + "-"*25 + f" Displaying Books by {author} " + "-"*25)
    books = db.books.find({"author": author})
    for book in books:
        print(f"Title: {book['title']}, Author: {book['author']}")
    input("Press any key to continue...")

# Display book by bookID
def display_book_by_id():
    book_id = input("Enter book ID: ")
    book = db.books.find_one({"bookId": book_id})
    print("\n" + "-"*25 + " Displaying Book by ID " + "-"*25)
    print(f"Title: {book['title']}, Author: {book['author']}")
    input("Press any key to continue...")

# Add books to wishlist
def add_book_to_wishlist():
    customer_id = input("Enter customer ID: ")
    book_id = input("Enter book ID: ")
    # Check if customer ID and book ID exist in the database
    if db.customers.count_documents({'customerId': customer_id}) == 0:
        print("Customer ID not found.")
        return
    # Check if book ID exists in the database
    if db.books.count_documents({'bookId': book_id}) == 0:
        print("Book ID not found.")
        return
    # Add the book ID to the wishlist
    db.wishlistitems.update_one(
        {'customerId': customer_id},
        {'$addToSet': {'bookId': book_id}},
        upsert=True
    )
    print("Book added to wishlist!")
    input("Press any key to continue...")

# Function to remove books from wishlist
def remove_book_from_wishlist():
    customer_id = input("Enter customer ID: ")
    book_id = input("Enter book ID to remove: ")
    db.wishlistitems.update_one(
        {'customerId': customer_id},
        # Remove the book ID from the wishlist
        {'$pull': {'bookId': book_id}}
    )
    print(f"Book {book_id} removed from wishlist.")
    input("Press any key to continue...")

# Display wishlist by customer ID function
def display_wishlist_by_customer():
    # Get customer ID from user
    customer_id = input("Enter the customer ID (e.g., c1001): ")
    # Create the pipeline to aggregate the data from the database collections
    pipeline = [
        {'$match': {'customerId': customer_id}},
        # Join the wishlistitems collection with the books collection
        {'$lookup': {'from': 'books', 'localField': 'bookId', 'foreignField': 'bookId', 'as': 'book_info'}},
        {'$unwind': '$book_info'}
    ]
    # Aggregate the data
    wishlist_items = db.wishlistitems.aggregate(pipeline)
    # Get the count of wishlist items
    count = db.wishlistitems.count_documents({'customerId': customer_id})
    # Display the data
    if count == 0:
        print("No wishlist items found for customer ID, or customer ID does not exist:", customer_id)
    else:
        print(f"Wishlist items for customer ID: {customer_id}")
        # Loop through the wishlist items and display the data
        for item in wishlist_items:
            print(f"Book Title: {item['book_info']['title']}, Author: {item['book_info']['author']}")
    input("Press any key to continue...")

# Main application function, displays menu and calls functions based on user input
def main():
    while True:
        try: 
            # Display menu
            print("\n--- Welcome to WhatABook! ---")
            print("Please select an option below:")
            print("1: Display Books")
            print("2: Display Books by Genre")
            print("3: Search Books by Author")
            print("4: Display book by book ID")
            print("5: Add book to wishlist")
            print("6: Remove book from wishlist")
            print("7: Display Wishlist by Customer ID")
            print("8: Exit")
            
            choice = input("Enter choice: ")
            
            # Call functions based on user input
            if choice == "1":
                display_books()
            elif choice == "2":
                display_books_by_genre()
            elif choice == "3":
                search_books_by_author()
            elif choice == "4":
                display_book_by_id()
            elif choice == "5":
                add_book_to_wishlist()
            elif choice == "6":
                remove_book_from_wishlist()
            elif choice == "7":
                display_wishlist_by_customer()
            elif choice == "8":
                print("Goodbye!")
                break
            else:
                print("Invalid choice, please try again.")
        # Catch any exceptions
        except Exception as e:
            print(f"An error occurred: {e}")
            input("Press Enter to continue...")

# Call main function
if __name__ == "__main__":
    main()
