// Practice 02: Library Management System
// This code violates SRP - Book class handles too many responsibilities

class Book {
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    // Responsibility 1: Book data management
    getTitle() {
        return this.title;
    }

    getAvailableCopies() {
        return this.availableCopies;
    }

    // Responsibility 2: Inventory management (should be separate)
    borrowBook() {
        if (this.availableCopies > 0) {
            this.availableCopies--;
            console.log(`Book "${this.title}" borrowed. Remaining: ${this.availableCopies}`);
            return true;
        }
        console.log(`Sorry, "${this.title}" is not available.`);
        return false;
    }

    returnBook() {
        this.availableCopies++;
        console.log(`Book "${this.title}" returned. Available: ${this.availableCopies}`);
    }

    // Responsibility 3: Notification system (should be separate)
    sendOverdueNotification(memberEmail) {
        console.log(`Sending overdue notification to ${memberEmail}`);
        console.log(`Subject: Overdue Book - ${this.title}`);
        console.log(`Please return the book as soon as possible.`);
    }

    // Responsibility 4: Report generation (should be separate)
    generatePopularityReport() {
        console.log(`=== Book Popularity Report ===`);
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`Times borrowed: ${10 - this.availableCopies}`);
        console.log(`Current availability: ${this.availableCopies}/10`);
    }

    // Responsibility 5: Database persistence (should be separate)
    updateDatabase() {
        console.log(`Updating book ${this.isbn} in database...`);
        console.log(`Available copies set to: ${this.availableCopies}`);
    }
}

// Main execution
function main() {
    const book = new Book("Clean Code", "Robert Martin", "978-0132350884", 10);
    
    book.borrowBook();
    book.updateDatabase();
    book.sendOverdueNotification("member@library.com");
    book.generatePopularityReport();
}

main();


