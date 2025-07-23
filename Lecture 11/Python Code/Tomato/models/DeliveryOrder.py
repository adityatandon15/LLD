from models.Order import Order

class DeliveryOrder(Order):
    def __init__(self, user, restaurant, items, delivery_address, order_type="Delivery", scheduled_time=None):
        super().__init__(user, restaurant, items, order_type, scheduled_time)
        self.delivery_address = delivery_address

    def get_delivery_address(self):
        return self.delivery_address

    def set_delivery_address(self, address):
        self.delivery_address = address