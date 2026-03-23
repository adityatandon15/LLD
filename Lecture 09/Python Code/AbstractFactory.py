# --- Product 1 --> Burger ---
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
        print("Preparing Premium Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!")


class BasicWheatBurger(Burger):
    def prepare(self):
        print("Preparing Basic Wheat Burger with bun, patty, and ketchup!")


class StandardWheatBurger(Burger):
    def prepare(self):
        print("Preparing Standard Wheat Burger with bun, patty, cheese, and lettuce!")


class PremiumWheatBurger(Burger):
    def prepare(self):
        print("Preparing Premium Wheat Burger with gourmet bun, premium patty, cheese, lettuce, and secret sauce!")


# --- Product 2 --> GarlicBread ---
class GarlicBread(ABC):
    @abstractmethod
    def prepare(self):
        pass


class BasicGarlicBread(GarlicBread):
    def prepare(self):
        print("Preparing Basic Garlic Bread with butter and garlic!")


class CheeseGarlicBread(GarlicBread):
    def prepare(self):
        print("Preparing Cheese Garlic Bread with extra cheese and butter!")


class BasicWheatGarlicBread(GarlicBread):
    def prepare(self):
        print("Preparing Basic Wheat Garlic Bread with butter and garlic!")


class CheeseWheatGarlicBread(GarlicBread):
    def prepare(self):
        print("Preparing Cheese Wheat Garlic Bread with extra cheese and butter!")


# --- Abstract Factory ---
class MealFactory(ABC):
    @abstractmethod
    def createBurger(self, type):
        pass

    @abstractmethod
    def createGarlicBread(self, type):
        pass


# --- Concrete Factory 1 ---
class SinghBurger(MealFactory):
    def createBurger(self, type):
        if type.lower() == "basic":
            return BasicBurger()
        elif type.lower() == "standard":
            return StandardBurger()
        elif type.lower() == "premium":
            return PremiumBurger()
        else:
            print("Invalid burger type!")
            return None

    def createGarlicBread(self, type):
        if type.lower() == "basic":
            return BasicGarlicBread()
        elif type.lower() == "cheese":
            return CheeseGarlicBread()
        else:
            print("Invalid Garlic bread type!")
            return None


# --- Concrete Factory 2 ---
class KingBurger(MealFactory):
    def createBurger(self, type):
        if type.lower() == "basic":
            return BasicWheatBurger()
        elif type.lower() == "standard":
            return StandardWheatBurger()
        elif type.lower() == "premium":
            return PremiumWheatBurger()
        else:
            print("Invalid burger type!")
            return None

    def createGarlicBread(self, type):
        if type.lower() == "basic":
            return BasicWheatGarlicBread()
        elif type.lower() == "cheese":
            return CheeseWheatGarlicBread()
        else:
            print("Invalid Garlic bread type!")
            return None


# --- Main ---
if __name__ == "__main__":
    burgerType = "basic"
    garlicBreadType = "cheese"

    mealFactory = SinghBurger()

    burger = mealFactory.createBurger(burgerType)
    garlicBread = mealFactory.createGarlicBread(garlicBreadType)

    if burger:
        burger.prepare()
    if garlicBread:
        garlicBread.prepare()
