class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

class ShoppingCart:
    """
    Represents a shopping cart that violates OCP by hardcoding persistence methods.
    """

    def __init__(self):
        self.products = []

    def add_product(self, product):
        self.products.append(product)

    def calculate_total(self):
        return sum(p.price for p in self.products)

    def save_to_sql_database(self):
        print("Saving shopping cart to SQL DB...")

    def save_to_mongo_database(self):
        print("Saving shopping cart to MongoDB...")

    def save_to_file(self):
        print("Saving shopping cart to a file...")

if __name__ == "__main__":
    cart = ShoppingCart()
    cart.add_product(Product("Laptop", 50000))
    cart.add_product(Product("Mouse", 2000))

    cart.save_to_sql_database()
    cart.save_to_mongo_database()
    cart.save_to_file()