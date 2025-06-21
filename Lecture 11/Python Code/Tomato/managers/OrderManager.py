from services.NotificationService import NotificationService

class OrderManager:
    def __init__(self):
        self.orders = []

    def place_order(self, order):
        self.orders.append(order)
        NotificationService.notify(order)

    def get_orders(self):
        return self.orders