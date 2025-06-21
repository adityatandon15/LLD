from abc import ABC, abstractmethod

class Account(ABC):
    @abstractmethod
    def deposit(self, amount):
        pass

    @abstractmethod
    def withdraw(self, amount):
        pass

class SavingAccount(Account):
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: {amount} in Savings Account. New Balance: {self.balance}")

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            print(f"Withdrawn: {amount} from Savings Account. New Balance: {self.balance}")
        else:
            print("Insufficient funds in Savings Account!")

class CurrentAccount(Account):
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: {amount} in Current Account. New Balance: {self.balance}")

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            print(f"Withdrawn: {amount} from Current Account. New Balance: {self.balance}")
        else:
            print("Insufficient funds in Current Account!")

class FixedTermAccount(Account):
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: {amount} in Fixed Term Account. New Balance: {self.balance}")

    def withdraw(self, amount):
        raise NotImplementedError("Withdrawal not allowed in Fixed Term Account!")

class BankClient:
    def __init__(self, accounts):
        self.accounts = accounts

    def process_transactions(self):
        for acc in self.accounts:
            acc.deposit(1000)
            try:
                acc.withdraw(500)
            except NotImplementedError as e:
                print(f"Exception: {e}")

if __name__ == "__main__":
    accounts = [SavingAccount(), CurrentAccount(), FixedTermAccount()]
    client = BankClient(accounts)
    client.process_transactions()