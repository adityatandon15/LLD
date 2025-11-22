export class OrderManager {
    constructor() {
        if (OrderManager.instance) {
            return OrderManager.instance;
        }
        this.orders = [];
        OrderManager.instance = this;
    }

    static getInstance() {
        if (!OrderManager.instance) {
            OrderManager.instance = new OrderManager();
        }
        return OrderManager.instance;
    }

    addOrder(order) {
        this.orders.push(order);
    }

    listOrders() {
        console.log("\n--- All Orders ---");
        for (const order of this.orders) {
            console.log(`${order.getType()} order for ${order.getUser().getName()} | Total: ₹${order.getTotal()} | At: ${order.getScheduled()}`);
        }
    }
}
