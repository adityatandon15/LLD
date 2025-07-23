from abc import ABC, abstractmethod

class Car(ABC):
    """
    Car Interface --> Acts as an interface for the outside world to operate the car.
    This interface tells 'WHAT' all it can do rather than 'HOW' it does that.
    """

    @abstractmethod
    def start_engine(self):
        pass

    @abstractmethod
    def shift_gear(self, gear):
        pass

    @abstractmethod
    def accelerate(self):
        pass

    @abstractmethod
    def brake(self):
        pass

    @abstractmethod
    def stop_engine(self):
        pass


class SportsCar(Car):
    """
    Concrete class that provides implementation details of the Car interface.
    Represents a real-world sports car with all functionalities.
    """

    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.is_engine_on = False
        self.current_speed = 0
        self.current_gear = 0

    def start_engine(self):
        self.is_engine_on = True
        print(f"{self.brand} {self.model} : Engine starts with a roar!")

    def shift_gear(self, gear):
        if not self.is_engine_on:
            print(f"{self.brand} {self.model} : Engine is off! Cannot shift gear.")
            return
        self.current_gear = gear
        print(f"{self.brand} {self.model} : Shifted to gear {self.current_gear}")

    def accelerate(self):
        if not self.is_engine_on:
            print(f"{self.brand} {self.model} : Engine is off! Cannot accelerate.")
            return
        self.current_speed += 20
        print(f"{self.brand} {self.model} : Accelerating to {self.current_speed} km/h")

    def brake(self):
        self.current_speed -= 20
        if self.current_speed < 0:
            self.current_speed = 0
        print(f"{self.brand} {self.model} : Braking! Speed is now {self.current_speed} km/h")

    def stop_engine(self):
        self.is_engine_on = False
        self.current_gear = 0
        self.current_speed = 0
        print(f"{self.brand} {self.model} : Engine turned off.")


# Main Method
if __name__ == "__main__":
    my_car = SportsCar("Ford", "Mustang")

    my_car.start_engine()
    my_car.shift_gear(1)
    my_car.accelerate()
    my_car.shift_gear(2)
    my_car.accelerate()
    my_car.brake()
    my_car.stop_engine()