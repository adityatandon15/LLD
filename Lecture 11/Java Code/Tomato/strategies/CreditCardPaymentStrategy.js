import { PaymentStrategy } from './PaymentStrategy.js';

export class CreditCardPaymentStrategy extends PaymentStrategy {
    constructor(card) {
        super();
        this.cardNumber = card;
    }

    pay(amount) {
        console.log(`Paid ₹${amount} using Credit Card (${this.cardNumber})`);
    }
}
