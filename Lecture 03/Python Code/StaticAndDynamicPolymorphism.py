from abc import ABC, abstractmethod

class Car(ABC):
    """
    Abstract base class representing a generic car.
    """

    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.is_engine_on = False
        self.current_speed = 0

    def start_engine(self):
        self.is_engine_on = True
        print(f"{self.brand} {self.model} : Engine started.")

    def stop_engine(self):
        self.is_engine_on = False
        self.current_speed = 0
        print(f"{self.brand} {self.model} : Engine turned off.")

    @abstractmethod
    def accelerate(self, speed=None):
        pass

    @abstractmethod
    def brake(self):
        pass


class ManualCar(Car):
    """
    Represents a manual car with gear shifting functionality.
    """

    def __init__(self, brand, model):
        super().__init__(brand, model)
        self.current_gear = 0

    def shift_gear(self, gear):
        self.current_gear = gear
        print(f"{self.brand} {self.model} : Shifted to gear {self.current_gear}")

    def accelerate(self, speed=None):
        if not self.is_engine_on:
            print(f"{self.brand} {self.model} : Cannot accelerate! Engine is off.")
            return
        if speed is None:
            self.current_speed += 20
        else:
            self.current_speed += speed
        print(f"{self.brand} {self.model} : Accelerating to {self.current_speed} km/h")

    def brake(self):
        self.current_speed -= 20
        if self.current_speed < 0:
            self.current_speed = 0
        print(f"{self.brand} {self.model} : Braking! Speed is now {self.current_speed} km/h")


class ElectricCar(Car):
    """
    Represents an electric car with battery functionality.
    """

    def __init__(self, brand, model):
        super().__init__(brand, model)
        self.battery_level = 100

    def charge_battery(self):
        self.battery_level = 100
        print(f"{self.brand} {self.model} : Battery fully charged!")

    def accelerate(self, speed=None):
        if not self.is_engine_on:
            print(f"{self.brand} {self.model} : Cannot accelerate! Engine is off.")
            return
        if self.battery_level <= 0:
            print(f"{self.brand} {self.model} : Battery dead! Cannot accelerate.")
            return
        if speed is None:
            self.battery_level -= 10
            self.current_speed += 15
        else:
            self.battery_level -= 10 + speed
            self.current_speed += speed
        print(f"{self.brand} {self.model} : Accelerating to {self.current_speed} km/h. Battery at {self.battery_level}%.")

    def brake(self):
        self.current_speed -= 15
        if self.current_speed < 0:
            self.current_speed = 0
        print(f"{self.brand} {self.model} : Regenerative braking! Speed is now {self.current_speed} km/h. Battery at {self.battery_level}%.")


if __name__ == "__main__":
    my_manual_car = ManualCar("Ford", "Mustang")
    my_manual_car.start_engine()
    my_manual_car.accelerate()
    my_manual_car.accelerate(30)
    my_manual_car.brake()
    my_manual_car.stop_engine()

    print("----------------------")

    my_electric_car = ElectricCar("Tesla", "Model S")
    my_electric_car.start_engine()
    my_electric_car.accelerate()
    my_electric_car.accelerate(25)
    my_electric_car.brake()
    my_electric_car.stop_engine()