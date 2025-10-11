// Product class representing any item of any ECommerce.
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Violating SRP: ShoppingCart is handling multiple responsibilities
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

    // 1. Calculates total price in cart.
    calculateTotal() {
        let total = 0;
        for (const product of this.products) {
            total += product.price;
        }
        return total;
    }

    // 2. Violating SRP - Prints invoice (Should be in a separate class)
    printInvoice() {
        console.log("Shopping Cart Invoice:");
        for (const product of this.products) {
            console.log(`${product.name} - Rs ${product.price}`);
        }
        console.log(`Total: Rs ${this.calculateTotal()}`);
    }

    // 3. Violating SRP - Saves to DB (Should be in a separate class)
    saveToDatabase() {
        console.log("Saving shopping cart to database...");
    }
}

// Main execution
function main() {
    const cart = new ShoppingCart();

    cart.addProduct(new Product("Laptop", 50000));
    cart.addProduct(new Product("Mouse", 2000));

    cart.printInvoice();
    cart.saveToDatabase();
}

main();

