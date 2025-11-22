import { OrderFactory } from './OrderFactory.js';
import { DeliveryOrder } from '../models/DeliveryOrder.js';
import { PickupOrder } from '../models/PickupOrder.js';
import { TimeUtils } from '../utils/TimeUtils.js';

export class NowOrderFactory extends OrderFactory {
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
        order.setScheduled(TimeUtils.getCurrentTime());
        order.setTotal(totalCost);
        return order;
    }
}
