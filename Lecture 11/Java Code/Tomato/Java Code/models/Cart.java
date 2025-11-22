package models;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private Restaurant restaurant;
    private List<MenuItem> items = new ArrayList<>();

    public Cart() {
        restaurant = null;
    }

    public void addItem(MenuItem item) {
        if (restaurant == null) {
            System.err.println("Cart: Set a restaurant before adding items.");
            return;
        }
        items.add(item);
    }

    public double getTotalCost() {
        double sum = 0;
        for (MenuItem it : items) {
            sum += it.getPrice();
        }
        return sum;
    }

    public boolean isEmpty() {
        return restaurant == null || items.isEmpty();
    }

    public void clear() {
        items.clear();
        restaurant = null;
    }

    public void setRestaurant(Restaurant r) {
        restaurant = r;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public List<MenuItem> getItems() {
        return items;
    }
}

