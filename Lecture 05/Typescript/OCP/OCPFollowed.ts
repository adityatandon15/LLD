// Product class representing any item in eCommerce.
class Product {
    public name: string
    public price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }
}

// 1. ShoppingCart: Only responsible for cart related business logic.
class ShoppingCart {
    private products: Product[] = []

    public addProduct(p: Product): void {
        this.products.push(p)
    }

    public getProducts(): Product[] {
        return this.products
    }

    // Calculates total price in cart.
    public calculateTotal(): number {
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

    public printInvoice(): void {
        console.log("Shopping Cart Invoice:")
        for (const p of this.cart.getProducts()) {
            console.log(`${p.name} - Rs ${p.price}`)
        }
        console.log(`Total: Rs ${this.cart.calculateTotal()}`)
    }
}

// Persistence abstraction
interface Persistence {
    save(cart: ShoppingCart): void
}

class SQLPersistence implements Persistence {
    save(cart: ShoppingCart): void {
        console.log("Saving shopping cart to SQL DB...")
    }
}

class MongoPersistence implements Persistence {
    save(cart: ShoppingCart): void {
        console.log("Saving shopping cart to MongoDB...")
    }
}

class FilePersistence implements Persistence {
    save(cart: ShoppingCart): void {
        console.log("Saving shopping cart to a file...")
    }
}

// Equivalent of Java main
function main(): void {
    const cart = new ShoppingCart()
    cart.addProduct(new Product("Laptop", 50000))
    cart.addProduct(new Product("Mouse", 2000))

    const printer = new ShoppingCartPrinter(cart)
    printer.printInvoice()

    const db: Persistence = new SQLPersistence()
    const mongo: Persistence = new MongoPersistence()
    const file: Persistence = new FilePersistence()

    db.save(cart)
    mongo.save(cart)
    file.save(cart)
}

main()


/**
 * If a .ts file has no imports or exports, TypeScript treats it as a global script.
 * Adding `export {}` marks the file as a module and prevents
 * "Duplicate identifier 'ShoppingCart'" errors.
 */
export {}