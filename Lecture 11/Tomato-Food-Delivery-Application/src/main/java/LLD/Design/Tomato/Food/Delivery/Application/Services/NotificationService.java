package LLD.Design.Tomato.Food.Delivery.Application.Services;

import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.Order;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    public void notifyUser(Order order) {
        System.out.println("Notification sent to " + order.getUser().getUserName()
                + ": Your " + order.getType() + " order #" + order.getOrderId() + " is confirmed!");
    }
}
