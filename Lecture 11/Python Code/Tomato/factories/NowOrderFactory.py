from factories.OrderFactory import OrderFactory
from models.Order import Order

class NowOrderFactory(OrderFactory):
    def create_order(self, user, cart):
        order = Order(user, cart.get_restaurant(), cart.get_items(), "Now")
        return order