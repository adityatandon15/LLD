# --- Burger Interface ---
from abc import ABC, abstractmethod

class Burger(ABC):
    @abstractmethod
    def prepare(self):
        pass


# --- Concrete Burger Implementations ---
class BasicBurger(Burger):
    def prepare(self):
        print("Preparing Basic Burger with bun, patty, and ketchup!")


class StandardBurger(Burger):
    def prepare(self):
        print("Preparing Standard Burger with bun, patty, cheese, and lettuce!")


class PremiumBurger(Burger):
    def prepare(self):
        print("Preparing Premium Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!")


# --- Burger Factory ---
class BurgerFactory:
    def create_burger(self, type_):
        if type_.lower() == "basic":
            return BasicBurger()
        elif type_.lower() == "standard":
            return StandardBurger()
        elif type_.lower() == "premium":
            return PremiumBurger()
        else:
            print("Invalid burger type!")
            return None


# --- Main ---
if __name__ == "__main__":
    type_ = "standard"

    my_burger_factory = BurgerFactory()
    burger = my_burger_factory.create_burger(type_)

    if burger:
        burger.prepare()
