// Practice 03: Order Processing System
// This code violates SRP - Order class has multiple responsibilities

class Order {
    constructor(orderId, customerId, items) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.items = items; // Array of {name, price, quantity}
        this.status = 'pending';
    }

    // Responsibility 1: Order data management
    getOrderId() {
        return this.orderId;
    }

    getStatus() {
        return this.status;
    }

    // Responsibility 2: Price calculation (should be separate)
    calculateTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.price * item.quantity;
        }
        return total;
    }

    applyDiscount(discountPercent) {
        const total = this.calculateTotal();
        const discount = (total * discountPercent) / 100;
        return total - discount;
    }

    // Responsibility 3: Payment processing (should be separate)
    processPayment(cardNumber, amount) {
        console.log(`Processing payment of Rs ${amount}`);
        console.log(`Card: **** **** **** ${cardNumber.slice(-4)}`);
        console.log(`Payment successful!`);
        this.status = 'paid';
    }

    // Responsibility 4: Shipping management (should be separate)
    shipOrder(address) {
        console.log(`Shipping order ${this.orderId} to:`);
        console.log(address);
        console.log(`Estimated delivery: 3-5 business days`);
        this.status = 'shipped';
    }

    // Responsibility 5: Email notifications (should be separate)
    sendConfirmationEmail(email) {
        console.log(`Sending confirmation email to ${email}`);
        console.log(`Order ID: ${this.orderId}`);
        console.log(`Total: Rs ${this.calculateTotal()}`);
        console.log(`Status: ${this.status}`);
    }

    // Responsibility 6: Database operations (should be separate)
    saveOrder() {
        console.log(`Saving order ${this.orderId} to database...`);
        console.log(`Status: ${this.status}`);
    }
}

// Main execution
function main() {
    const items = [
        { name: "Laptop", price: 50000, quantity: 1 },
        { name: "Mouse", price: 2000, quantity: 2 }
    ];
    
    const order = new Order("ORD001", "CUST123", items);
    const finalAmount = order.applyDiscount(10);
    order.processPayment("1234567890123456", finalAmount);
    order.shipOrder("123 Main St, Mumbai, India");
    order.sendConfirmationEmail("customer@example.com");
    order.saveOrder();
}

main();


