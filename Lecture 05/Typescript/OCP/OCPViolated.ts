// Product class representing any item in eCommerce.
class Product {
    name: string
    price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }
}

// 1. ShoppingCart: Only responsible for cart related business logic.
class ShoppingCart {
    private products: Product[] = []

    addProduct(p: Product): void {
        this.products.push(p)
    }

    getProducts(): Product[] {
        return this.products
    }

    calculateTotal(): number {
        let total = 0
        for (const p of this.products) {
            total += p.price
        }
        return total
    }
}

// 2. ShoppingCartPrinter: Only responsible for printing invoices
class ShoppingCartPrinter {
    private cart: ShoppingCart

    constructor(cart: ShoppingCart) {
        this.cart = cart
    }

    printInvoice(): void {
        console.log("Shopping Cart Invoice:")
        for (const p of this.cart.getProducts()) {
            console.log(`${p.name} - Rs ${p.price}`)
        }
        console.log(`Total: Rs ${this.cart.calculateTotal()}`)
    }
}

// 3. ShoppingCartStorage: OCP VIOLATED
class ShoppingCartStorage {
    private cart: ShoppingCart

    constructor(cart: ShoppingCart) {
        this.cart = cart
    }

    saveToSQLDatabase(): void {
        console.log("Saving shopping cart to SQL DB...")
    }

    saveToMongoDatabase(): void {
        console.log("Saving shopping cart to Mongo DB...")
    }

    saveToFile(): void {
        console.log("Saving shopping cart to File...")
    }
}

// Equivalent of Java main
function main(): void {
    const cart = new ShoppingCart()

    cart.addProduct(new Product("Laptop", 50000))
    cart.addProduct(new Product("Mouse", 2000))

    const printer = new ShoppingCartPrinter(cart)
    printer.printInvoice()

    const db = new ShoppingCartStorage(cart)
    db.saveToSQLDatabase()
}

main()

/**
 * If a .ts file has no imports or exports, TypeScript treats it as a global script.
 * Adding `export {}` marks the file as a module and prevents
 * "Duplicate identifier 'ShoppingCart'" errors.
 */
export {}
