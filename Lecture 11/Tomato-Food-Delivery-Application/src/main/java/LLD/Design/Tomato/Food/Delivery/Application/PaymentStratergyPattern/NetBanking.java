package LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern;


import org.springframework.stereotype.Component;

@Component("netBanking")
public class NetBanking implements IPaymentStratergy{
    @Override
    public void pay(double amount){
        System.out.println("Payment done of " + amount+ " using Net Banking");
    }
}
