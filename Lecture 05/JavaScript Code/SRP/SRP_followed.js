// Product class representing any item of any ECommerce.
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// 1. ShoppingCart: Only responsible for cart management and business logic
class ShoppingCart {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    // Business logic - calculating total belongs to cart
    calculateTotal() {
        let total = 0;
        for (const product of this.products) {
            total += product.price;
        }
        return total;
    }
}

// 2. InvoicePrinter: Only responsible for printing invoices
class InvoicePrinter {
    constructor(cart) {
        this.cart = cart;
    }

    printInvoice() {
        console.log("Shopping Cart Invoice:");
        for (const product of this.cart.getProducts()) {
            console.log(`${product.name} - Rs ${product.price}`);
        }
        console.log(`Total: Rs ${this.cart.calculateTotal()}`);
    }
}

// 3. DatabaseSaver: Only responsible for database operations
class DatabaseSaver {
    constructor(cart) {
        this.cart = cart;
    }

    saveToDatabase() {
        console.log("Saving shopping cart to database...");
        // If needed, access cart data: this.cart.getProducts()
    }
}


// Main execution
function main() {
    // Step 1: Create the cart
    const cart = new ShoppingCart();

    // Step 2: Add products to cart
    cart.addProduct(new Product("Laptop", 50000));
    cart.addProduct(new Product("Mouse", 2000));

    // Step 3: Create printer with cart reference and print
    const printer = new InvoicePrinter(cart);
    printer.printInvoice();

    // Step 4: Create database saver with cart reference and save
    const saver = new DatabaseSaver(cart);
    saver.saveToDatabase();
}

main();

