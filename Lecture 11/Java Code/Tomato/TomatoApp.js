import { Restaurant } from './models/Restaurant.js';
import { MenuItem } from './models/MenuItem.js';
import { RestaurantManager } from './managers/RestaurantManager.js';
import { OrderManager } from './managers/OrderManager.js';
import { NowOrderFactory } from './factories/NowOrderFactory.js';
import { ScheduledOrderFactory } from './factories/ScheduledOrderFactory.js';
import { NotificationService } from './services/NotificationService.js';

export class TomatoApp {
    constructor() {
        this.initializeRestaurants();
    }

    initializeRestaurants() {
        const restaurant1 = new Restaurant("Bikaner", "Delhi");
        restaurant1.addMenuItem(new MenuItem("P1", "Chole Bhature", 120));
        restaurant1.addMenuItem(new MenuItem("P2", "Samosa", 15));

        const restaurant2 = new Restaurant("Haldiram", "Kolkata");
        restaurant2.addMenuItem(new MenuItem("P1", "Raj Kachori", 80));
        restaurant2.addMenuItem(new MenuItem("P2", "Pav Bhaji", 100));
        restaurant2.addMenuItem(new MenuItem("P3", "Dhokla", 50));

        const restaurant3 = new Restaurant("Saravana Bhavan", "Chennai");
        restaurant3.addMenuItem(new MenuItem("P1", "Masala Dosa", 90));
        restaurant3.addMenuItem(new MenuItem("P2", "Idli Vada", 60));
        restaurant3.addMenuItem(new MenuItem("P3", "Filter Coffee", 30));

        const restaurantManager = RestaurantManager.getInstance();
        restaurantManager.addRestaurant(restaurant1);
        restaurantManager.addRestaurant(restaurant2);
        restaurantManager.addRestaurant(restaurant3);
    }

    searchRestaurants(location) {
        return RestaurantManager.getInstance().searchByLocation(location);
    }

    selectRestaurant(user, restaurant) {
        const cart = user.getCart();
        cart.setRestaurant(restaurant);
    }

    addToCart(user, itemCode) {
        const restaurant = user.getCart().getRestaurant();
        if (!restaurant) {
            console.log("Please select a restaurant first.");
            return;
        }
        for (const item of restaurant.getMenu()) {
            if (item.getCode() === itemCode) {
                user.getCart().addItem(item);
                break;
            }
        }
    }

    checkoutNow(user, orderType, paymentStrategy) {
        return this.checkout(user, orderType, paymentStrategy, new NowOrderFactory());
    }

    checkoutScheduled(user, orderType, paymentStrategy, scheduleTime) {
        return this.checkout(user, orderType, paymentStrategy, new ScheduledOrderFactory(scheduleTime));
    }

    checkout(user, orderType, paymentStrategy, orderFactory) {
        if (user.getCart().isEmpty()) return null;

        const userCart = user.getCart();
        const orderedRestaurant = userCart.getRestaurant();
        const itemsOrdered = userCart.getItems();
        const totalCost = userCart.getTotalCost();

        const order = orderFactory.createOrder(user, userCart, orderedRestaurant, itemsOrdered, paymentStrategy, totalCost, orderType);
        OrderManager.getInstance().addOrder(order);
        return order;
    }

    payForOrder(user, order) {
        const isPaymentSuccess = order.processPayment();

        if (isPaymentSuccess) {
            NotificationService.notify(order);
            user.getCart().clear();
        }
    }

    printUserCart(user) {
        console.log("Items in cart:");
        console.log("------------------------------------");
        for (const item of user.getCart().getItems()) {
            console.log(`${item.getCode()} : ${item.getName()} : ₹${item.getPrice()}`);
        }
        console.log("------------------------------------");
        console.log(`Grand total : ₹${user.getCart().getTotalCost()}`);
    }
}
