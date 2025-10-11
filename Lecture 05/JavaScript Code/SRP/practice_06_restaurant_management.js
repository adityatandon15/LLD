// Practice 06: Restaurant Management System
// This code violates SRP - Restaurant class handles multiple responsibilities

class Restaurant {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.menu = [];
        this.orders = [];
        this.reservations = [];
    }

    // Responsibility 1: Menu management (should be separate)
    addMenuItem(itemName, price, category) {
        const item = { name: itemName, price, category };
        this.menu.push(item);
        console.log(`Added ${itemName} to menu at Rs ${price}`);
    }

    removeMenuItem(itemName) {
        this.menu = this.menu.filter(item => item.name !== itemName);
        console.log(`Removed ${itemName} from menu`);
    }

    displayMenu() {
        console.log(`\n=== ${this.name} Menu ===`);
        for (const item of this.menu) {
            console.log(`${item.name} (${item.category}) - Rs ${item.price}`);
        }
    }

    // Responsibility 2: Order processing (should be separate)
    placeOrder(tableNumber, items) {
        const order = {
            tableNumber,
            items,
            status: 'pending',
            timestamp: new Date()
        };
        this.orders.push(order);
        console.log(`Order placed for table ${tableNumber}`);
        return order;
    }

    updateOrderStatus(tableNumber, status) {
        const order = this.orders.find(o => o.tableNumber === tableNumber);
        if (order) {
            order.status = status;
            console.log(`Table ${tableNumber} order status: ${status}`);
        }
    }

    // Responsibility 3: Billing (should be separate)
    calculateBill(order) {
        let total = 0;
        for (const itemName of order.items) {
            const menuItem = this.menu.find(item => item.name === itemName);
            if (menuItem) {
                total += menuItem.price;
            }
        }
        return total;
    }

    generateInvoice(tableNumber) {
        const order = this.orders.find(o => o.tableNumber === tableNumber);
        if (order) {
            console.log(`\n=== Invoice - Table ${tableNumber} ===`);
            console.log(`Restaurant: ${this.name}`);
            for (const itemName of order.items) {
                const item = this.menu.find(i => i.name === itemName);
                console.log(`${itemName} - Rs ${item.price}`);
            }
            console.log(`Total: Rs ${this.calculateBill(order)}`);
        }
    }

    // Responsibility 4: Reservation management (should be separate)
    makeReservation(customerName, date, time, partySize) {
        const reservation = { customerName, date, time, partySize };
        this.reservations.push(reservation);
        console.log(`Reservation confirmed for ${customerName} on ${date} at ${time}`);
    }

    // Responsibility 5: Notification system (should be separate)
    sendReservationConfirmation(customerEmail, reservation) {
        console.log(`Sending confirmation email to ${customerEmail}`);
        console.log(`Restaurant: ${this.name}`);
        console.log(`Date: ${reservation.date} at ${reservation.time}`);
        console.log(`Party size: ${reservation.partySize}`);
    }

    // Responsibility 6: Analytics (should be separate)
    generateDailySalesReport() {
        let totalSales = 0;
        for (const order of this.orders) {
            totalSales += this.calculateBill(order);
        }
        console.log(`\n=== Daily Sales Report ===`);
        console.log(`Total Orders: ${this.orders.length}`);
        console.log(`Total Revenue: Rs ${totalSales}`);
        console.log(`Average Order Value: Rs ${(totalSales / this.orders.length).toFixed(2)}`);
    }
}

// Main execution
function main() {
    const restaurant = new Restaurant("Spice Garden", "123 Food Street, Mumbai");
    
    restaurant.addMenuItem("Biryani", 250, "Main Course");
    restaurant.addMenuItem("Paneer Tikka", 180, "Appetizer");
    restaurant.addMenuItem("Gulab Jamun", 80, "Dessert");
    
    restaurant.displayMenu();
    
    const order = restaurant.placeOrder(5, ["Biryani", "Paneer Tikka"]);
    restaurant.updateOrderStatus(5, "preparing");
    restaurant.generateInvoice(5);
    
    restaurant.makeReservation("Amit Kumar", "2025-10-15", "19:00", 4);
    restaurant.sendReservationConfirmation("amit@example.com", {
        date: "2025-10-15",
        time: "19:00",
        partySize: 4
    });
    
    restaurant.generateDailySalesReport();
}

main();


