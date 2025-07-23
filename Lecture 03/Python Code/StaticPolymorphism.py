class ManualCar:
    """
    Represents a manual car demonstrating static polymorphism (method overloading).
    """

    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.is_engine_on = False
        self.current_speed = 0
        self.current_gear = 0

    def start_engine(self):
        self.is_engine_on = True
        print(f"{self.brand} {self.model} : Engine started.")

    def stop_engine(self):
        self.is_engine_on = False
        self.current_speed = 0
        print(f"{self.brand} {self.model} : Engine turned off.")

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

    def shift_gear(self, gear):
        self.current_gear = gear
        print(f"{self.brand} {self.model} : Shifted to gear {self.current_gear}")


if __name__ == "__main__":
    my_manual_car = ManualCar("Suzuki", "WagonR")
    my_manual_car.start_engine()
    my_manual_car.accelerate()
    my_manual_car.accelerate(40)
    my_manual_car.brake()
    my_manual_car.stop_engine()