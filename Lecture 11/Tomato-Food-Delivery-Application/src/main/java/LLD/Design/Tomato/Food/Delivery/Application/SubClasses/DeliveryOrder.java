package LLD.Design.Tomato.Food.Delivery.Application.SubClasses;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryOrder extends Order{
    private String DeliveryAddress;

    @Override
    public String getType() {
        return "DELIVERY";
    }
}
