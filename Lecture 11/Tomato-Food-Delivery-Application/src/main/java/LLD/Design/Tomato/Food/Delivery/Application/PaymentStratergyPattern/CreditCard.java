package LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern;


import org.springframework.stereotype.Component;

@Component("creditCard")
public class CreditCard implements IPaymentStratergy{
    @Override
    public void pay(double amount){
        System.out.println("Payment done of " + amount+ " using Credit card");
    }
}
