from models.Cart import Cart

class User:
    def __init__(self, user_id, name, location):
        self.user_id = user_id
        self.name = name
        self.location = location
        self.cart = Cart()

    def get_name(self):
        return self.name

    def get_cart(self):
        return self.cart