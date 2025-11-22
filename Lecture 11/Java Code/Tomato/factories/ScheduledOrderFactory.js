import { OrderFactory } from './OrderFactory.js';
import { DeliveryOrder } from '../models/DeliveryOrder.js';
import { PickupOrder } from '../models/PickupOrder.js';

export class ScheduledOrderFactory extends OrderFactory {
    constructor(scheduleTime) {
        super();
        this.scheduleTime = scheduleTime;
    }

    createOrder(user, cart, restaurant, menuItems, paymentStrategy, totalCost, orderType) {
        let order = null;

        if (orderType === "Delivery") {
            const deliveryOrder = new DeliveryOrder();
            deliveryOrder.setUserAddress(user.getAddress());
            order = deliveryOrder;
        } else {
            const pickupOrder = new PickupOrder();
            pickupOrder.setRestaurantAddress(restaurant.getLocation());
            order = pickupOrder;
        }

        order.setUser(user);
        order.setRestaurant(restaurant);
        order.setItems(menuItems);
        order.setPaymentStrategy(paymentStrategy);
        order.setScheduled(this.scheduleTime);
        order.setTotal(totalCost);
        return order;
    }
}
