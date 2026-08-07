package LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern;


import org.springframework.stereotype.Component;

@Component("upiPayment")
public class UPIPayment implements IPaymentStratergy{
    @Override
    public void pay(double amount){
        System.out.println("Payment done of " + amount+ " using UPI Payment Method");
    }
}
