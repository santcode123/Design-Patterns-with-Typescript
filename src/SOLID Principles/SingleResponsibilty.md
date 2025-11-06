### Solid Principles

#### Introduction

 Solid principles are backbone of object oriented programming it helps to write clean and bug free code. this pattern was introduced by Robert c martin.

### Single Responsibilty Principle

 This principle states that every class should have single task to do, it should not do multiple task.

 Example: create a class for Book store , that will  have adding book in the store and selling the book from the store and daily revenue and total revenue generated so far and shows how many books are available for each subject and contains some database to store the books information.

 BAD CODE (without Single Responsibilty principle)

 ```
 // for the demo purpose we are using in memory to store the books 
 [book name]: { book info};

class Book {
    title: string;
    author: string;
    subject: string;
    price: number;

    constructor(title: string, author: string, subject: string, price: number) {
        this.title = title;
        this.author = author;
        this.subject = subject;
        this.price = price;
    }
}


class BookStore {
    private storeName: string;
    private books: { [subject: string]: Book[] } = {};
    private dailyRevenue: number = 0;
    private totalRevenue: number = 0;

    constructor(storeName){
     this.storeName = storeName;
    }

   addBook(book: Book): void {
        if (!this.books[book.subject]) {
            this.books[book.subject] = [];
        }
        this.books[book.subject].push(book);
    }

    sellBook(title: string): Book | null {
        for (let subject in this.books) {
            const bookIndex = this.books[subject].findIndex(book => book.title === title);
            if (bookIndex !== -1) {
                const book = this.books[subject][bookIndex];
                this.books[subject].splice(bookIndex, 1);
                return book;
            }
        }
        return null;
    }

    getBooksAvailableBySubject(): { [subject: string]: number } {
        const booksCount: { [subject: string]: number } = {};
        for (let subject in this.books) {
            booksCount[subject] = this.books[subject].length;
        }
        return booksCount;
    }

    isBookInStock(title: string): boolean {
        for (let subject in this.books) {
            if (this.books[subject].some(book => book.title === title)) {
                return true;
            }
        }
        return false;
    }
    
     addRevenue(amount: number): void {
        this.dailyRevenue += amount;
        this.totalRevenue += amount;
    }

    resetDailyRevenue(): void {
        this.dailyRevenue = 0;
    }

    getDailyRevenue(): number {
        return this.dailyRevenue;
    }

    getTotalRevenue(): number {
        return this.totalRevenue;
    }

 
}

// Example usage
const store = new BookStore();

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 10.99);
const book2 = new Book("1984", "George Orwell", "Dystopian", 8.99);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "Fiction", 12.99);

store.addBook(book1);
store.addBook(book2);
store.addBook(book3);

console.log(store.isBookInStock("1984")); // true
console.log(store.isBookInStock("The Catcher in the Rye")); // false

store.sellBook("1984");

console.log(store.isBookInStock("1984")); // false

console.log(`Daily Revenue: $${store.getDailyRevenue()}`);
console.log(`Total Revenue: $${store.getTotalRevenue()}`);
console.log(`Books available by subject:`, store.getBooksAvailableBySubject());

store.resetDailyRevenue();
console.log(`Daily Revenue after reset: $${store.getDailyRevenue()}`);

 ```

Note: above code does not follow single resposibilty principle so we need to refactor it as follows

 LLD Analysis:

 1. create a BookStore class that is responsible for above feature.
 2. making InventoryManager class to handle the logic related to adding and selling books

 3. make a RevenueManger class to handle the revenue related logics

 ```
 class Book {
    title: string;
    author: string;
    subject: string;
    price: number;

    constructor(title: string, author: string, subject: string, price: number) {
        this.title = title;
        this.author = author;
        this.subject = subject;
        this.price = price;
    }
}

class InventoryManager {
    private books: { [subject: string]: Book[] } = {};

    addBook(book: Book): void {
        if (!this.books[book.subject]) {
            this.books[book.subject] = [];
        }
        this.books[book.subject].push(book);
    }

    sellBook(title: string): Book | null {
        for (let subject in this.books) {
            const bookIndex = this.books[subject].findIndex(book => book.title === title);
            if (bookIndex !== -1) {
                const book = this.books[subject][bookIndex];
                this.books[subject].splice(bookIndex, 1);
                return book;
            }
        }
        return null;
    }

    getBooksAvailableBySubject(): { [subject: string]: number } {
        const booksCount: { [subject: string]: number } = {};
        for (let subject in this.books) {
            booksCount[subject] = this.books[subject].length;
        }
        return booksCount;
    }

    isBookInStock(title: string): boolean {
        for (let subject in this.books) {
            if (this.books[subject].some(book => book.title === title)) {
                return true;
            }
        }
        return false;
    }
}

class RevenueManager {
    private dailyRevenue: number = 0;
    private totalRevenue: number = 0;

    addRevenue(amount: number): void {
        this.dailyRevenue += amount;
        this.totalRevenue += amount;
    }

    resetDailyRevenue(): void {
        this.dailyRevenue = 0;
    }

    getDailyRevenue(): number {
        return this.dailyRevenue;
    }

    getTotalRevenue(): number {
        return this.totalRevenue;
    }
}

class BookStore {
    private storeName: string;
    private inventoryManager: InventoryManager;
    private revenueManager: RevenueManager;

    constructor(storeName) {
        this.storeName = storeName;
        this.inventoryManager = new InventoryManager();
        this.revenueManager = new RevenueManager();
    }

    addBook(book: Book): void {
        this.inventoryManager.addBook(book);
    }

    sellBook(title: string): void {
        const book = this.inventoryManager.sellBook(title);
        if (book) {
            this.revenueManager.addRevenue(book.price);
            console.log(`Sold book: ${title} for $${book.price}`);
        } else {
            console.log(`Book titled "${title}" not found in the store.`);
        }
    }

    getDailyRevenue(): number {
        return this.revenueManager.getDailyRevenue();
    }

    getTotalRevenue(): number {
        return this.revenueManager.getTotalRevenue();
    }

    resetDailyRevenue(): void {
        this.revenueManager.resetDailyRevenue();
    }

    getBooksAvailableBySubject(): { [subject: string]: number } {
        return this.inventoryManager.getBooksAvailableBySubject();
    }

    isBookInStock(title: string): boolean {
        return this.inventoryManager.isBookInStock(title);
    }
}

// Example usage

const store = new BookStore('Store-1);

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 10.99);
const book2 = new Book("1984", "George Orwell", "Dystopian", 8.99);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "Fiction", 12.99);

store.addBook(book1);
store.addBook(book2);
store.addBook(book3);

console.log(store.isBookInStock("1984")); // true
console.log(store.isBookInStock("The Catcher in the Rye")); // false

store.sellBook("1984");

console.log(store.isBookInStock("1984")); // false

console.log(`Daily Revenue: $${store.getDailyRevenue()}`);
console.log(`Total Revenue: $${store.getTotalRevenue()}`);
console.log(`Books available by subject:`, store.getBooksAvailableBySubject());

store.resetDailyRevenue();
console.log(`Daily Revenue after reset: $${store.getDailyRevenue()}`);

 ```


 Hope you understood the logic behind it why we need single resposiblty principle.

 1. it helps to code write bug free code
 2. each class has single resposibilty
 3. easily testable




