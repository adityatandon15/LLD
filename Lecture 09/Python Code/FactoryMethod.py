# Product Interface and subclasses
from abc import ABC, abstractmethod


class Burger(ABC):
    @abstractmethod
    def prepare(self):
        pass


class BasicBurger(Burger):
    def prepare(self):
        print("Preparing Basic Burger with bun, patty, and ketchup!")


class StandardBurger(Burger):
    def prepare(self):
        print("Preparing Standard Burger with bun, patty, cheese, and lettuce!")


class PremiumBurger(Burger):
    def prepare(self):
        print(
            "Preparing Premium Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!"
        )


class BasicWheatBurger(Burger):
    def prepare(self):
        print("Preparing Basic Wheat Burger with bun, patty, and ketchup!")


class StandardWheatBurger(Burger):
    def prepare(self):
        print("Preparing Standard Wheat Burger with bun, patty, cheese, and lettuce!")


class PremiumWheatBurger(Burger):
    def prepare(self):
        print(
            "Preparing Premium Wheat Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!"
        )


# Factory Interface and Concrete Factories
class BurgerFactory(ABC):
    @abstractmethod
    def create_burger(self, type_):
        pass


class SinghBurger(BurgerFactory):
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


class KingBurger(BurgerFactory):
    def create_burger(self, type_):
        if type_.lower() == "basic":
            return BasicWheatBurger()
        elif type_.lower() == "standard":
            return StandardWheatBurger()
        elif type_.lower() == "premium":
            return PremiumWheatBurger()
        else:
            print("Invalid burger type!")
            return None


# Main
if __name__ == "__main__":
    type_ = "basic"

    my_factory = SinghBurger()
    burger = my_factory.create_burger(type_)

    if burger:
        burger.prepare()
