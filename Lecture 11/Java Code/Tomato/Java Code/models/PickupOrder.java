package models;

public class PickupOrder extends Order {
    private String restaurantAddress;

    public PickupOrder() {
        restaurantAddress = "";
    }

    @Override
    public String getType() {
        return "Pickup";
    }

    public void setRestaurantAddress(String addr) {
        restaurantAddress = addr;
    }

    public String getRestaurantAddress() {
        return restaurantAddress;
    }

    // Implement remaining Order methods with actual fields
}
