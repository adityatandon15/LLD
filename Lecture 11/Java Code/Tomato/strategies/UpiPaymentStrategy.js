import { PaymentStrategy } from './PaymentStrategy.js';

export class UpiPaymentStrategy extends PaymentStrategy {
    constructor(mob) {
        super();
        this.mobile = mob;
    }

    pay(amount) {
        console.log(`Paid ₹${amount} using UPI (${this.mobile})`);
    }
}
