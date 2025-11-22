import { TomatoApp } from './TomatoApp.js';
import { User } from './models/User.js';
import { UpiPaymentStrategy } from './strategies/UpiPaymentStrategy.js';

function main() {
    // Simulating a happy flow
    // Create TomatoApp Object
    const tomato = new TomatoApp();

    // Simulate a user coming in (Happy Flow)
    const user = new User(101, "Aditya", "Delhi");
    console.log(`User: ${user.getName()} is active.`);

    // User searches for restaurants by location
    const restaurantList = tomato.searchRestaurants("Delhi");

    if (restaurantList.length === 0) {
        console.log("No restaurants found!");
        return;
    }

    console.log("Found Restaurants:");
    for (const restaurant of restaurantList) {
        console.log(" - " + restaurant.getName());
    }

    // User selects a restaurant
    tomato.selectRestaurant(user, restaurantList[0]);
    console.log("Selected restaurant: " + restaurantList[0].getName());

    // User adds items to the cart
    tomato.addToCart(user, "P1");
    tomato.addToCart(user, "P2");

    tomato.printUserCart(user);

    // User checkout the cart
    const order = tomato.checkoutNow(user, "Delivery", new UpiPaymentStrategy("1234567890"));

    // User pays for the cart. If payment is successful, notification is sent.
    if (order) {
        tomato.payForOrder(user, order);
    }
}

main();
