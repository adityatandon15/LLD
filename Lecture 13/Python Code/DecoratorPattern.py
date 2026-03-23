# Component Interface: defines a common interface for Mario and all power-up decorators.
class Character:
    def get_abilities(self):
        raise NotImplementedError


# Concrete Component: Basic Mario character with no power-ups.
class Mario(Character):
    def get_abilities(self):
        return "Mario"


# Abstract Decorator: CharacterDecorator "is-a" Character and "has-a" Character.
class CharacterDecorator(Character):
    def __init__(self, c):
        self.character = c  # Wrapped component


# Concrete Decorator: Height-Increasing Power-Up.
class HeightUp(CharacterDecorator):
    def __init__(self, c):
        super().__init__(c)

    def get_abilities(self):
        return self.character.get_abilities() + " with HeightUp"


# Concrete Decorator: Gun Shooting Power-Up.
class GunPowerUp(CharacterDecorator):
    def __init__(self, c):
        super().__init__(c)

    def get_abilities(self):
        return self.character.get_abilities() + " with Gun"


# Concrete Decorator: Star Power-Up (temporary ability).
class StarPowerUp(CharacterDecorator):
    def __init__(self, c):
        super().__init__(c)

    def get_abilities(self):
        return self.character.get_abilities() + " with Star Power (Limited Time)"


class DecoratorPattern:
    @staticmethod
    def main():
        # Create a basic Mario character.
        mario = Mario()
        print("Basic Character:", mario.get_abilities())

        # Decorate Mario with a HeightUp power-up.
        mario = HeightUp(mario)
        print("After HeightUp:", mario.get_abilities())

        # Decorate Mario further with a GunPowerUp.
        mario = GunPowerUp(mario)
        print("After GunPowerUp:", mario.get_abilities())

        # Finally, add a StarPowerUp decoration.
        mario = StarPowerUp(mario)
        print("After StarPowerUp:", mario.get_abilities())


if __name__ == "__main__":
    DecoratorPattern.main()
