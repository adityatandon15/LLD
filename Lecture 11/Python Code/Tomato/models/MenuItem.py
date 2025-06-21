class MenuItem:
    def __init__(self, code, name, price):
        self.code = code
        self.name = name
        self.price = price

    def get_code(self):
        return self.code

    def set_code(self, code):
        self.code = code

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_price(self):
        return self.price

    def set_price(self, price):
        self.price = price