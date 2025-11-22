import { Order } from './Order.js';

export class PickupOrder extends Order {
    constructor() {
        super();
        this.restaurantAddress = "";
    }

    getType() {
        return "Pickup";
    }

    setRestaurantAddress(addr) {
        this.restaurantAddress = addr;
    }

    getRestaurantAddress() {
        return this.restaurantAddress;
    }
}
