#include <iostream>
#include <string>

using namespace std;

/*
Dynamic Polymorphism in real life says that 2 Objects coming from same
family will respond to same stimulus differently. Like in real world Manual
car and Electric car will respond to accelerate() differently.

To represent this in programming, we create a parent class that defines all
characters and behaviours that are generic to all child classes and are also same in
all child classes but make those methods abstract(virtual) that are generic to all
child classes but all child class will behave differently. Then those child class
will provide implementation details of these abstract methods the way they want.
*/
class Car
{
protected:
    string brand;
    string model;
    bool isEngineOn;
    int currentSpeed;

public:
    Car(string brand, string model)
    {
        this->brand = brand;
        this->model = model;
        this->isEngineOn = false;
        this->currentSpeed = 0;
    }

    // Common methods for All cars.
    void startEngine()
    {
        isEngineOn = true;
        cout << brand << " " << model << " : Engine started." << endl;
    }

    void stopEngine()
    {
        isEngineOn = false;
        currentSpeed = 0;
        cout << brand << " " << model << " : Engine turned off." << endl;
    }

    virtual void accelerate() = 0; // Abstract method for Dynamic Polymorphism
    virtual void brake() = 0;      // Abstract method for Dynamic Polymorphism
    virtual ~Car() {}              // Virtual destructor
};

class ManualCar : public Car
{
private:
    int currentGear;

public:
    ManualCar(string brand, string model) : Car(brand, model)
    {
        this->currentGear = 0;
    }

    // Specialized method for Manual Car
    void shiftGear(int gear)
    {
        currentGear = gear;
        cout << brand << " " << model << " : Shifted to gear " << currentGear << endl;
    }

    // Overriding accelerate - Dynamic Polymorphism
    void accelerate()
    {
        if (!isEngineOn)
        {
            cout << brand << " " << model << " : Cannot accelerate! Engine is off." << endl;
            return;
        }
        currentSpeed += 20;
        cout << brand << " " << model << " : Accelerating to " << currentSpeed << " km/h" << endl;
    }

    // Overriding brake - Dynamic Polymorphism
    void brake()
    {
        currentSpeed -= 20;
        if (currentSpeed < 0)
            currentSpeed = 0;
        cout << brand << " " << model << " : Braking! Speed is now " << currentSpeed << " km/h" << endl;
    }
};
// 
https://github.com/krndav/LLD/tree/study_branch

class ElectricCar : public Car
{
private:
    int batteryLevel;

public:
    ElectricCar(string brand, string model) : Car(brand, model)
    {
        this->batteryLevel = 100;
    }

    // specialized method for Electric Car
    void chargeBattery()
    {
        batteryLevel = 100;
        cout << brand << " " << model << " : Battery fully charged!" << endl;
    }

    // Overriding accelerate - Dynamic Polymorphism
    void accelerate()
    {
        if (!isEngineOn)
        {
            cout << brand << " " << model << " : Cannot accelerate! Engine is off." << endl;
            return;
        }
        if (batteryLevel <= 0)
        {
            cout << brand << " " << model << " : Battery dead! Cannot accelerate." << endl;
            return;
        }
        batteryLevel -= 10;
        currentSpeed += 15;
        cout << brand << " " << model << " : Accelerating to " << currentSpeed << " km/h. Battery at " << batteryLevel << "%." << endl;
    }

    // Overriding brake - Dynamic Polymorphism
    void brake()
    {
        currentSpeed -= 15;
        if (currentSpeed < 0)
            currentSpeed = 0;
        cout << brand << " " << model << " : Regenerative braking! Speed is now " << currentSpeed << " km/h. Battery at " << batteryLevel << "%." << endl;
    }
};

// Main function
int main()
{
    Car *myManualCar = new ManualCar("Suzuki", "WagonR");
    myManualCar->startEngine();
    myManualCar->accelerate();
    myManualCar->accelerate();
    myManualCar->brake();
    myManualCar->stopEngine();

    cout << "----------------------" << endl;

    Car *myElectricCar = new ElectricCar("Tesla", "Model S");
    myElectricCar->startEngine();
    myElectricCar->accelerate();
    myElectricCar->accelerate();
    myElectricCar->brake();
    myElectricCar->stopEngine();

    // Cleanup
    delete myManualCar;
    delete myElectricCar;

    return 0;
}