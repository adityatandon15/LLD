import { Order } from './Order.js';

export class DeliveryOrder extends Order {
    constructor() {
        super();
        this.userAddress = "";
    }

    getType() {
        return "Delivery";
    }

    setUserAddress(addr) {
        this.userAddress = addr;
    }

    getUserAddress() {
        return this.userAddress;
    }
}
