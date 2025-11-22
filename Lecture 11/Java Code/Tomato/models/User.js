import { Cart } from './Cart.js';

export class User {
    constructor(userId, name, address) {
        this.userId = userId;
        this.name = name;
        this.address = address;
        this.cart = new Cart();
    }

    getName() {
        return this.name;
    }

    setName(n) {
        this.name = n;
    }

    getAddress() {
        return this.address;
    }

    setAddress(a) {
        this.address = a;
    }

    getCart() {
        return this.cart;
    }
}
