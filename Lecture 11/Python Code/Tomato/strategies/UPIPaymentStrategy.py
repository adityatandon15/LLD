from strategies.PaymentStrategy import PaymentStrategy

class UPIPaymentStrategy(PaymentStrategy):
    def pay(self, amount):
        print(f"Paid ₹{amount} using UPI.")
