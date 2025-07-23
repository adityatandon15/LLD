from models.order import Order

class PickupOrder(Order):
    def __init__(self, user, restaurant, items, pickup_time, order_type="Pickup"):
        super().__init__(user, restaurant, items, order_type, pickup_time)
        self.pickup_time = pickup_time

    def get_pickup_time(self):
        return self.pickup_time

    def set_pickup_time(self, time):
        self.pickup_time = time