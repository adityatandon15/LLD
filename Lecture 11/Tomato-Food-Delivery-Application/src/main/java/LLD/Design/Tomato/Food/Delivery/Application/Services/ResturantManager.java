package LLD.Design.Tomato.Food.Delivery.Application.Services;


import LLD.Design.Tomato.Food.Delivery.Application.Entities.Resturant;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResturantManager {
    private final List<Resturant> restaurants = new ArrayList<>();

    public void addRestaurant(Resturant restaurant) {
        restaurants.add(restaurant);
    }

    public List<Resturant> searchByLoc(String loc) {
        return restaurants.stream()
                .filter(r -> r.getResturantLocation().equalsIgnoreCase(loc))
                .collect(Collectors.toList());
    }

    public List<Resturant> getRestaurants() {
        return restaurants;
    }
}
