from strategies.PaymentStrategy import PaymentStrategy

class CreditCardPaymentStrategy(PaymentStrategy):
    def pay(self, amount):
        print(f"Paid ₹{amount} using Credit Card.")