package LLD.Design.Tomato.Food.Delivery.Application.SubClasses;

import LLD.Design.Tomato.Food.Delivery.Application.Entities.MenuItem;
import LLD.Design.Tomato.Food.Delivery.Application.Entities.Resturant;
import LLD.Design.Tomato.Food.Delivery.Application.Entities.User;
import LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern.IPaymentStratergy;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public abstract class Order {

    private int OrderId;
    private User user;
    private Resturant resturant;
    private List<MenuItem> items;
    private IPaymentStratergy stratergy;

    public abstract String getType();
}
