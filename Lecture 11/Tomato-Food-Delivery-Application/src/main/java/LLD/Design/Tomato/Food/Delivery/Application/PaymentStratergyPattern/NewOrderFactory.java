package LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern;

import LLD.Design.Tomato.Food.Delivery.Application.Entities.Cart;
import LLD.Design.Tomato.Food.Delivery.Application.Entities.User;
import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.DeliveryOrder;
import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.Order;
import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.PickupOrder;
import org.springframework.stereotype.Component;


@Component
public class NewOrderFactory implements IOrderFactory{


    @Override
    public Order createOrder(User user, String type) {
        Cart cart = new Cart();
        Order order;

        if ("DELIVERY".equalsIgnoreCase(type)){
            DeliveryOrder deliveryOrder = new DeliveryOrder();
            deliveryOrder.setDeliveryAddress(user.getUserAddress());
            order = deliveryOrder;
        }
        else {
            PickupOrder pickupOrder = new PickupOrder();
            pickupOrder.setPickUpAddress(cart.getResturant().getResturantLocation());
            order = pickupOrder;
        }

        order.setUser(user);
        order.setResturant(cart.getResturant());
        order.setItems(cart.getItems());
        return order;
    }
}
