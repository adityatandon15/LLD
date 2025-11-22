export class Order {
    static nextOrderId = 0;

    constructor() {
        if (this.constructor === Order) {
            // Abstract class simulation
            // throw new Error("Cannot instantiate abstract class Order");
        }
        this.user = null;
        this.restaurant = null;
        this.paymentStrategy = null;
        this.total = 0.0;
        this.scheduled = "";
        this.orderId = ++Order.nextOrderId;
        this.items = [];
    }

    processPayment() {
        if (this.paymentStrategy !== null) {
            this.paymentStrategy.pay(this.total);
            return true;
        } else {
            console.log("Please choose a payment mode first");
            return false;
        }
    }

    getType() {
        throw new Error("Method 'getType()' must be implemented.");
    }

    getOrderId() {
        return this.orderId;
    }

    setUser(u) {
        this.user = u;
    }

    getUser() {
        return this.user;
    }

    setRestaurant(r) {
        this.restaurant = r;
    }

    getRestaurant() {
        return this.restaurant;
    }

    setItems(its) {
        this.items = its;
        this.total = 0;
        for (const i of this.items) {
            this.total += i.getPrice();
        }
    }

    getItems() {
        return this.items;
    }

    setPaymentStrategy(p) {
        this.paymentStrategy = p;
    }

    setScheduled(s) {
        this.scheduled = s;
    }

    getScheduled() {
        return this.scheduled;
    }

    getTotal() {
        return this.total;
    }

    setTotal(total) {
        this.total = total;
    }
}
