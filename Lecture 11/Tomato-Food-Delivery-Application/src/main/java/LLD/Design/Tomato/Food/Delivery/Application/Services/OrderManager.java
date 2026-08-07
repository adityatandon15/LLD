package LLD.Design.Tomato.Food.Delivery.Application.Services;

import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.Order;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class OrderManager {
    private final List<Order> orderList = new ArrayList<>();

    public void addOrder(Order order) {
        orderList.add(order);
    }

    public List<Order> listOrders() {
        return orderList;
    }
}
