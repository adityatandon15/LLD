class Account:
    """
    Represents a generic account with deposit and withdraw functionality.
    """

    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: {amount}. New Balance: {self.balance}")

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            print(f"Withdrawn: {amount}. New Balance: {self.balance}")
        else:
            print("Insufficient funds!")

class FixedTermAccount(Account):
    """
    Represents a fixed-term account where withdrawal is not allowed.
    """

    def withdraw(self, amount):
        print("Withdrawal not allowed in Fixed Term Account!")

if __name__ == "__main__":
    saving_account = Account()
    saving_account.deposit(1000)
    saving_account.withdraw(500)

    fixed_term_account = FixedTermAccount()
    fixed_term_account.deposit(2000)
    fixed_term_account.withdraw(500)  # Violates LSP as withdrawal is not allowed