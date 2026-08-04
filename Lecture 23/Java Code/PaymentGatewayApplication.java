import java.util.*;

// ----------------------------
// Data structure for payment details
// ----------------------------
class PaymentRequest {
    public String sender;
    public String reciever;
    public double amount;
    public String currency;

    public PaymentRequest(String sender, String reciever, double amt, String curr) {
        this.sender   = sender;
        this.reciever = reciever;
        this.amount   = amt;
        this.currency = curr;
    }
}

// ----------------------------
// Banking System interface and implementations (Strategy for actual payment logic)
// ----------------------------
interface BankingSystem {
    boolean processPayment(double amount);
}

class PaytmBankingSystem implements BankingSystem {
    private Random rand = new Random();

    public PaytmBankingSystem() {}

    @Override
    public boolean processPayment(double amount) {
        // Simulate 20% success
        int r = rand.nextInt(100);
        return r < 20;
    }
}

class RazorpayBankingSystem implements BankingSystem {
    private Random rand = new Random();

    public RazorpayBankingSystem() {}

    @Override
    public boolean processPayment(double amount) {
        System.out.println("[BankingSystem-Razorpay] Processing payment of " + amount + "...");
        // Simulate 90% success
        int r = rand.nextInt(100);
        return r < 90;
    }
}

// ----------------------------
// Abstract base class for Payment Gateway (Template Method Pattern)
// ----------------------------
abstract class PaymentGateway {
    protected BankingSystem bankingSystem;

    public PaymentGateway() {
        this.bankingSystem = null;
    }

    // Template method defining the standard payment flow
    public boolean processPayment(PaymentRequest request) {
        if (!validatePayment(request)) {
            System.out.println("[PaymentGateway] Validation failed for " + request.sender + ".");
            return false;
        }
        if (!initiatePayment(request)) {
            System.out.println("[PaymentGateway] Initiation failed for " + request.sender + ".");
            return false;
        }
        if (!confirmPayment(request)) {
            System.out.println("[PaymentGateway] Confirmation failed for " + request.sender + ".");
            return false;
        }
        return true;
    }

    // Steps to be implemented by concrete gateways
    protected abstract boolean validatePayment(PaymentRequest request);
    protected abstract boolean initiatePayment(PaymentRequest request);
    protected abstract boolean confirmPayment(PaymentRequest request);
}

// ----------------------------
// Concrete Payment Gateway for Paytm
// ----------------------------
class PaytmGateway extends PaymentGateway {
    public PaytmGateway() {
        this.bankingSystem = new PaytmBankingSystem();
    }

    @Override
    protected boolean validatePayment(PaymentRequest request) {
        System.out.println("[Paytm] Validating payment for " + request.sender + ".");
        if (request.amount <= 0 || !"INR".equals(request.currency)) {
            return false;
        }
        return true;
    }

    @Override
    protected boolean initiatePayment(PaymentRequest request) {
        System.out.println("[Paytm] Initiating payment of " + request.amount
                + " " + request.currency + " for " + request.sender + ".");
        return bankingSystem.processPayment(request.amount);
    }

    @Override
    protected boolean confirmPayment(PaymentRequest request) {
        System.out.println("[Paytm] Confirming payment for " + request.sender + ".");
        // Confirmation always succeeds in this simulation
        return true;
    }
}

// ----------------------------
// Concrete Payment Gateway for Razorpay
// ----------------------------
class RazorpayGateway extends PaymentGateway {
    public RazorpayGateway() {
        this.bankingSystem = new RazorpayBankingSystem();
    }

    @Override
    protected boolean validatePayment(PaymentRequest request) {
        System.out.println("[Razorpay] Validating payment for " + request.sender + ".");
        if (request.amount <= 0) {
            return false;
        }
        return true;
    }

    @Override
    protected boolean initiatePayment(PaymentRequest request) {
        System.out.println("[Razorpay] Initiating payment of " + request.amount
                + " " + request.currency + " for " + request.sender + ".");
        return bankingSystem.processPayment(request.amount);
    }

    @Override
    protected boolean confirmPayment(PaymentRequest request) {
        System.out.println("[Razorpay] Confirming payment for " + request.sender + ".");
        // Confirmation always succeeds in this simulation
        return true;
    }
}

// ----------------------------
// Proxy class that wraps a PaymentGateway to add retries (Proxy Pattern)
// ----------------------------
class PaymentGatewayProxy extends PaymentGateway {
    private PaymentGateway realGateway;
    private int retries;

    public PaymentGatewayProxy(PaymentGateway gateway, int maxRetries) {
        this.realGateway = gateway;
        this.retries     = maxRetries;
    }

    @Override
    public boolean processPayment(PaymentRequest request) {
        boolean result = false;
        for (int attempt = 0; attempt < retries; ++attempt) {
            if (attempt > 0) {
                System.out.println("[Proxy] Retrying payment (attempt " + (attempt+1)
                        + ") for " + request.sender + ".");
            }
            result = realGateway.processPayment(request);
            if (result) break;
        }
        if (!result) {
            System.out.println("[Proxy] Payment failed after " + retries
                    + " attempts for " + request.sender + ".");
        }
        return result;
    }

    @Override
    protected boolean validatePayment(PaymentRequest request) {
        return realGateway.validatePayment(request);
    }

    @Override
    protected boolean initiatePayment(PaymentRequest request) {
        return realGateway.initiatePayment(request);
    }

    @Override
    protected boolean confirmPayment(PaymentRequest request) {
        return realGateway.confirmPayment(request);
    }
}

// ----------------------------
// Gateway Factory for creating gateway (Singleton)
// ----------------------------
enum GatewayType {
    PAYTM,
    RAZORPAY
}

class GatewayFactory {
    private static final GatewayFactory instance = new GatewayFactory();

    private GatewayFactory() {}

    public static GatewayFactory getInstance() {
        return instance;
    }

    public PaymentGateway getGateway(GatewayType type) {
        if (type == GatewayType.PAYTM) {
            PaymentGateway paymentGateway = new PaytmGateway();
            return new PaymentGatewayProxy(paymentGateway, 3);
        } else {
            PaymentGateway paymentGateway = new RazorpayGateway();
            return new PaymentGatewayProxy(paymentGateway, 1);
        }
    }
}

// ----------------------------
// Unified API service (Singleton)
// ----------------------------
class PaymentService {
    private static final PaymentService instance = new PaymentService();
    private PaymentGateway gateway;

    private PaymentService() {
        this.gateway = null;
    }

    public static PaymentService getInstance() {
        return instance;
    }

    public void setGateway(PaymentGateway g) {
        this.gateway = g;
    }

    public boolean processPayment(PaymentRequest request) {
        if (gateway == null) {
            System.out.println("[PaymentService] No payment gateway selected.");
            return false;
        }
        return gateway.processPayment(request);
    }
}

// ----------------------------
// Controller class for all client requests (Singleton)
// ----------------------------
class PaymentController {
    private static final PaymentController instance = new PaymentController();

    private PaymentController() {}

    public static PaymentController getInstance() {
        return instance;
    }

    public boolean handlePayment(GatewayType type, PaymentRequest req) {
        PaymentGateway paymentGateway = GatewayFactory.getInstance().getGateway(type);
        PaymentService.getInstance().setGateway(paymentGateway);
        return PaymentService.getInstance().processPayment(req);
    }
}

// ----------------------------
// Main: Client code now goes through controller
// ----------------------------
public class PaymentGatewayApplication {
    public static void main(String[] args) {
        PaymentRequest req1 = new PaymentRequest("Aditya", "Shubham", 1000.0, "INR");

        System.out.println("Processing via Paytm");
        System.out.println("------------------------------");
        boolean res1 = PaymentController.getInstance().handlePayment(GatewayType.PAYTM, req1);
        System.out.println("Result: " + (res1 ? "SUCCESS" : "FAIL"));
        System.out.println("------------------------------\n");

        PaymentRequest req2 = new PaymentRequest("Shubham", "Aditya", 500.0, "USD");

        System.out.println("Processing via Razorpay");
        System.out.println("------------------------------");
        boolean res2 = PaymentController.getInstance().handlePayment(GatewayType.RAZORPAY, req2);
        System.out.println("Result: " + (res2 ? "SUCCESS" : "FAIL"));
        System.out.println("------------------------------");
    }
}
