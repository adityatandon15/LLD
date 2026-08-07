package LLD.Design.Tomato.Food.Delivery.Application.SubClasses;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PickupOrder extends Order{
    private String PickUpAddress;

    @Override
    public String getType() {
        return "PICKUP";
    }
}
