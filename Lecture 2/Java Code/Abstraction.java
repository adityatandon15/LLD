
/*
Car Interface --> Act as an interface for Outsiude world to operate the car. 
This interface tells 'WHAT' all it can do rather then 'HOW' it does that.
Since this is an interface we cannot directly create Objects of this. We
need to implement it first and then that child class will have the responsibility to 
provide implementation details of all the methods in the interface.

In our real world example of Car, imagine you sitting in the car and able to operate
the car (startEngine, accelerate, brake, turn) just by pressing or moving some
pedals/buttons/stearing wheel etc. You dont need to know how these things work, and
also they are hidden under thre hood.
This Interface 'Car' denotes that (pedals/buttons/stearing wheel etc). 
*/

interface Car {
    void startEngine(); 
    void shiftGear(int gear);
    void accelerate();
    void brake();
    void stopEngine();
}

/*
This is a Concrete class (A class that provide implementation details of an interface/abstract class).
Now anyone can make an Object of 'SportsCar' and can assign it to 'Car' reference. 
(See main method for this)

In our real world example of Car, as you cannot have a real car by just having its body only
(all these buttons or pedals). You need to have the actual implementation of 'What' happens
when we press these buttons. 'SportsCar' class denotes that actual implementation. 

Hence we can concude, to denote a real world car in programming we created 2 classes.
One to deonte all the user-interface like pedals, buttons, stearing wheels etc ('Car' interface).
And another one to denote the actual car with all the implementations of these buttons (SportsCar' class).
 */

class SportsCar implements Car {
    String brand;
    String model;
    boolean isEngineOn = false;
    int currentSpeed = 0;
    int currentGear = 0;

    public SportsCar(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }

    @Override
    public void startEngine() {
        isEngineOn = true;
        System.out.println(brand + " " + model + " : Engine starts with a roar!");
    }

    @Override
    public void shiftGear(int gear) {
        if (!isEngineOn) {
            System.out.println(brand + " " + model + " : Engine is off! Cannot Cannot Shift Gear.");
            return;
        }
        this.currentGear = gear;
        System.out.println(brand + " " + model + " : Shifted to gear " + currentGear);
    }

    @Override
    public void accelerate() {
        if (!isEngineOn) {
            System.out.println(brand + " " + model + " : Engine is off! Cannot accelerate.");
            return;
        }
        currentSpeed += 20;
        System.out.println(brand + " " + model + " : Accelerating to " + currentSpeed + " km/h");
    }
    
    @Override
    public void brake() {
        currentSpeed -= 20;
        if (currentSpeed < 0) currentSpeed = 0;
        System.out.println(brand + " " + model + " : Braking! Speed is now " + currentSpeed + " km/h");
    }

    @Override
    public void stopEngine() {
        isEngineOn = false;
        currentGear = 0;
        currentSpeed = 0;
        System.out.println(brand + " " + model + " : Engine turned off.");
    }
}

public class Abstraction {
    public static void main(String[] args) {
        Car myCar = new SportsCar("Ford", "Mustang");

        myCar.startEngine();
        myCar.shiftGear(1);
        myCar.accelerate();
        myCar.shiftGear(2);
        myCar.accelerate();
        myCar.brake();
        myCar.stopEngine();
    }
}
