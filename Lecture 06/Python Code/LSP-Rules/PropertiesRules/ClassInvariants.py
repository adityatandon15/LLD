# Invariant: Balance cannot be negative
class BankAccount:
    def __init__(self, balance):
        if balance < 0:
            raise ValueError("Balance can't be negative")
        self.balance = balance

    def withdraw(self, amount):
        if self.balance - amount < 0:
            raise RuntimeError("Insufficient funds")
        self.balance -= amount
        print(f"Amount withdrawn. Remaining balance is {self.balance}")

# Breaks invariant: Should not be allowed.
class CheatAccount(BankAccount):
    def withdraw(self, amount):
        self.balance -= amount  # LSP break! Negative balance allowed
        print(f"Amount withdrawn. Remaining balance is {self.balance}")

if __name__ == "__main__":
    account = BankAccount(100)
    account.withdraw(50)

    cheat_account = CheatAccount(100)
    cheat_account.withdraw(150)  # Violates invariant