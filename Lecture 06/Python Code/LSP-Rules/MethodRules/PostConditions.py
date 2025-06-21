# A Postcondition must be satisfied after a method is executed.
# Subclasses can strengthen the Postcondition but cannot weaken it.

class Car:
    def __init__(self):
        self.speed = 0

    def accelerate(self):
        print("Accelerating")
        self.speed += 20

    # PostCondition: Speed must reduce after brake
    def brake(self):
        print("Applying brakes")
        self.speed -= 20

# Subclass can strengthen postcondition - Does not violate LSP
class HybridCar(Car):
    def __init__(self):
        super().__init__()
        self.charge = 0

    # PostCondition: Speed must reduce after brake
    # PostCondition: Charge must increase.
    def brake(self):
        print("Applying brakes")
        self.speed -= 20
        self.charge += 10

if __name__ == "__main__":
    hybrid_car = HybridCar()
    hybrid_car.brake()  # Works fine: HybridCar reduces speed and also increases charge