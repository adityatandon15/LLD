from factories.OrderFactory import OrderFactory
from models.Order import Order

class ScheduledOrderFactory(OrderFactory):
    def create_order(self, user, cart, scheduled_time):
        order = Order(user, cart.get_restaurant(), cart.get_items(), "Scheduled", scheduled_time)
        return order