class Order:
    next_order_id = 1

    def __init__(self, user, restaurant, items, order_type, scheduled_time=None):
        self.order_id = Order.next_order_id
        Order.next_order_id += 1
        self.user = user
        self.restaurant = restaurant
        self.items = items
        self.order_type = order_type
        self.scheduled_time = scheduled_time

    def get_order_id(self):
        return self.order_id

    def get_user(self):
        return self.user

    def get_restaurant(self):
        return self.restaurant

    def get_items(self):
        return self.items

    def get_total(self):
        return sum(item.get_price() for item in self.items)

    def get_type(self):
        return self.order_type

    def get_scheduled(self):
        return self.scheduled_time