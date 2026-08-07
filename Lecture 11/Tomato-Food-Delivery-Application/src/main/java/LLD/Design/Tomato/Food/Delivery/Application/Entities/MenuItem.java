package LLD.Design.Tomato.Food.Delivery.Application.Entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MenuItem {
    private int id;
    private String name;
    private double price;
}
