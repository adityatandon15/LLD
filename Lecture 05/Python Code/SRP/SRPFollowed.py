class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class ShoppingCart:
    def __init__(self):
        self.products = []

    def add_product(self, product):
        self.products.append(product)

    def calculate_total(self):
        return sum(p.price for p in self.products)

class ShoppingCartPrinter:
    def __init__(self, cart):
        self.cart = cart

    def print_invoice(self):
        print("Shopping Cart Invoice:")
        for product in self.cart.products:
            print(f"{product.name} - Rs {product.price}")
        print(f"Total: Rs {self.cart.calculate_total()}")

class ShoppingCartStorage:
    def __init__(self, cart):
        self.cart = cart

    def save_to_database(self):
        print("Saving shopping cart to database...")

if __name__ == "__main__":
    cart = ShoppingCart()
    cart.add_product(Product("Laptop", 50000))
    cart.add_product(Product("Mouse", 2000))

    printer = ShoppingCartPrinter(cart)
    printer.print_invoice()

    storage = ShoppingCartStorage(cart)
    storage.save_to_database()