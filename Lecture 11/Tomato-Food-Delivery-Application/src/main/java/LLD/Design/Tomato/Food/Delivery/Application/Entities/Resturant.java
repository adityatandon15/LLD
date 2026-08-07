package LLD.Design.Tomato.Food.Delivery.Application.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Resturant {
    private int ResturantId;
    private String ResturantName;
    private String ResturantLocation;

    private List<String> MenuItems = new ArrayList<>();
}
