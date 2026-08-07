package LLD.Design.Tomato.Food.Delivery.Application;

import LLD.Design.Tomato.Food.Delivery.Application.Entities.Cart;
import LLD.Design.Tomato.Food.Delivery.Application.Entities.MenuItem;
import LLD.Design.Tomato.Food.Delivery.Application.Entities.Resturant;
import LLD.Design.Tomato.Food.Delivery.Application.Entities.User;
import LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern.IPaymentStratergy;
import LLD.Design.Tomato.Food.Delivery.Application.PaymentStratergyPattern.NewOrderFactory;
import LLD.Design.Tomato.Food.Delivery.Application.Services.NotificationService;
import LLD.Design.Tomato.Food.Delivery.Application.Services.OrderManager;
import LLD.Design.Tomato.Food.Delivery.Application.Services.ResturantManager;
import LLD.Design.Tomato.Food.Delivery.Application.SubClasses.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Map;

@SpringBootApplication
public class TomatoFoodDeliveryApplication implements CommandLineRunner {

    @Autowired
    private ResturantManager restaurantManager;

    @Autowired
    private OrderManager orderManager;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NewOrderFactory newOrderFactory;

    @Autowired
    private Map<String, IPaymentStratergy> paymentStrategies;

	public static void main(String[] args) {
		SpringApplication.run(TomatoFoodDeliveryApplication.class, args);
	}

    @Override
    public void run(String... args) {
        // 1. Initialize Restaurant & Items
        Resturant restaurant = new Resturant(1, "Pizza Palace", "Downtown", new ArrayList<>());
        MenuItem pizza = new MenuItem(1, "Margherita Pizza", 250);
        restaurant.getMenuItems().add(pizza.getName());
        restaurantManager.addRestaurant(restaurant);

        // 2. Setup User & Cart
        User user = new User("101", "John Doe", "123 Main St", new Cart());
        user.getCart().setResturant(restaurant);
        user.getCart().addToCart(pizza);

        // 3. Create Order using Factory
        Order order = newOrderFactory.createOrder(user, "DELIVERY");
        order.setOrderId(1001);

        // 4. Set Payment Strategy & Process Payment
        IPaymentStratergy upiPayment = paymentStrategies.get("upiPayment");
        order.setStratergy(upiPayment);
        order.getStratergy().pay(user.getCart().totalCost());

        // 5. Manage & Notify
        orderManager.addOrder(order);
        notificationService.notifyUser(order);
    }
}
