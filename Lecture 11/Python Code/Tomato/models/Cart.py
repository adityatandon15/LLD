class Cart:
    def __init__(self):
        self.restaurant = None
        self.items = []

    def set_restaurant(self, restaurant):
        self.restaurant = restaurant

    def get_restaurant(self):
        return self.restaurant

    def add_item(self, item):
        self.items.append(item)

    def get_items(self):
        return self.items

    def calculate_total(self):
        return sum(item.get_price() for item in self.items)