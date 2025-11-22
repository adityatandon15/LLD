package models;

import java.util.List;
import strategies.*;

public abstract class Order {
    private static int nextOrderId = 0;

    protected int orderId;
    protected User user;
    protected Restaurant restaurant;
    protected List<MenuItem> items;
    protected PaymentStrategy paymentStrategy;
    protected double total;
    protected String scheduled;

    public Order() {
        this.user = null;
        this.restaurant = null;
        this.paymentStrategy = null;
        this.total = 0.0;
        this.scheduled = "";
        this.orderId = ++nextOrderId;
    }

    public boolean processPayment() {
        if (paymentStrategy != null) {
            paymentStrategy.pay(total);
            return true;
        } else {
            System.out.println("Please choose a payment mode first");
            return false;
        }
    }

    public abstract String getType();

    // Getters and Setters
    public int getOrderId() {
        return orderId;
    }

    public void setUser(User u) {
        user = u;
    }

    public User getUser() {
        return user;
    }

    public void setRestaurant(Restaurant r) {
        restaurant = r;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setItems(List<MenuItem> its) {
        items = its;
        total = 0;
        for (MenuItem i : items) {
            total += i.getPrice();
        }
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public void setPaymentStrategy(PaymentStrategy p) {
        paymentStrategy = p;
    }

    public void setScheduled(String s) {
        scheduled = s;
    }

    public String getScheduled() {
        return scheduled;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

