package LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern;

import LLD.Design.Tomato.Food.Delivery.Application.Entities.User;
import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.Order;

public interface IOrderFactory {
    Order createOrder(User user, String type);
}
