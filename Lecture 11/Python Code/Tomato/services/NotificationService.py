class NotificationService:
    @staticmethod
    def notify(order):
        print(f"\nNotification: New {order.get_type()} order placed!")
        print("---------------------------------------------")
        print(f"Order ID: {order.get_order_id()}")
        print(f"Customer: {order.get_user().get_name()}")
        print(f"Restaurant: {order.get_restaurant().get_name()}")
        print("Items Ordered:")
        for item in order.get_items():
            print(f"   - {item.get_name()} (₹{item.get_price()})")
        print(f"Total: ₹{order.get_total()}")
        print(f"Scheduled For: {order.get_scheduled()}")
        print("Payment: Done")
        print("---------------------------------------------")