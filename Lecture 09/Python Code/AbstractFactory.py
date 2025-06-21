from abc import ABC, abstractmethod

# --- Product 1 --> Burger ---
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
    def create_burger(self, type_):
        pass
    
    @abstractmethod
    def create_garlic_bread(self, type_):
        pass

# --- Concrete Factory 1 ---
class SinghBurger(MealFactory):
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

    def create_garlic_bread(self, type_):
        if type_.lower() == "basic":
            return BasicGarlicBread()
        elif type_.lower() == "cheese":
            return CheeseGarlicBread()
        else:
            print("Invalid Garlic bread type!")
            return None

# --- Concrete Factory 2 ---
class KingBurger(MealFactory):
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

    def create_garlic_bread(self, type_):
        if type_.lower() == "basic":
            return BasicWheatGarlicBread()
        elif type_.lower() == "cheese":
            return CheeseWheatGarlicBread()
        else:
            print("Invalid Garlic bread type!")
            return None

# --- Main Section ---
if __name__ == "__main__":
    burger_type = "basic"
    garlic_bread_type = "cheese"

    meal_factory = SinghBurger()

    burger = meal_factory.create_burger(burger_type)
    garlic_bread = meal_factory.create_garlic_bread(garlic_bread_type)

    if burger:
        burger.prepare()
    if garlic_bread:
        garlic_bread.prepare()
