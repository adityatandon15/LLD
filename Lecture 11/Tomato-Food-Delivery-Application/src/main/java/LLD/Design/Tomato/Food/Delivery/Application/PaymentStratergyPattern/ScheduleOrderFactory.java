package LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern;

import LLD.Design.Tomato.Food.Delivery.Application.Entities.User;
import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.Order;

public class ScheduleOrderFactory implements IOrderFactory{

private String ScheduleTime;
public void setScheduleTime(String ScheduleTime){
    this.ScheduleTime = ScheduleTime;
}
    @Override
    public Order createOrder(User user, String type) {
        NewOrderFactory baseFactory = new NewOrderFactory();
        Order order = baseFactory.createOrder(user, type);
        System.out.println("Order Scheduled for : " + ScheduleTime);
        return order;
    }
}
