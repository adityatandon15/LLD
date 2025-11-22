export class Cart {
    constructor() {
        this.restaurant = null;
        this.items = [];
    }

    addItem(item) {
        if (this.restaurant === null) {
            console.error("Cart: Set a restaurant before adding items.");
            return;
        }
        this.items.push(item);
    }

    getTotalCost() {
        let sum = 0;
        for (const item of this.items) {
            sum += item.getPrice();
        }
        return sum;
    }

    isEmpty() {
        return this.restaurant === null || this.items.length === 0;
    }

    clear() {
        this.items = [];
        this.restaurant = null;
    }

    setRestaurant(r) {
        this.restaurant = r;
    }

    getRestaurant() {
        return this.restaurant;
    }

    getItems() {
        return this.items;
    }
}
