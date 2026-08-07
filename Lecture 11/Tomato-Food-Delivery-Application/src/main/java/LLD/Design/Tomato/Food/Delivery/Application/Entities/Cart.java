package LLD.Design.Tomato.Food.Delivery.Application.Entities;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class Cart {
    private Resturant resturant;

    private List<MenuItem> items = new ArrayList<>();

    public void addToCart(MenuItem item){
        items.add(item);
    }

    public double totalCost(){
        return items.stream().mapToDouble(MenuItem::getPrice).sum();
    }
    public boolean empty(){
        return items.isEmpty();
    }

}
