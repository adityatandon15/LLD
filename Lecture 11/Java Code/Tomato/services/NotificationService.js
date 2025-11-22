export class NotificationService {
    static notify(order) {
        console.log(`\nNotification: New ${order.getType()} order placed!`);
        console.log("---------------------------------------------");
        console.log(`Order ID: ${order.getOrderId()}`);
        console.log(`Customer: ${order.getUser().getName()}`);
        console.log(`Restaurant: ${order.getRestaurant().getName()}`);
        console.log("Items Ordered:");

        const items = order.getItems();
        for (const item of items) {
            console.log(`   - ${item.getName()} (₹${item.getPrice()})`);
        }

        console.log(`Total: ₹${order.getTotal()}`);
        console.log(`Scheduled For: ${order.getScheduled()}`);
        console.log("Payment: Done");
        console.log("---------------------------------------------");
    }
}
