class Restaurant:
    next_restaurant_id = 0

    def __init__(self, name, location):
        self.restaurant_id = Restaurant.next_restaurant_id + 1
        Restaurant.next_restaurant_id += 1
        self.name = name
        self.location = location
        self.menu = []

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_location(self):
        return self.location

    def set_location(self, location):
        self.location = location

    def add_menu_item(self, item):
        self.menu.append(item)

    def get_menu(self):
        return self.menu