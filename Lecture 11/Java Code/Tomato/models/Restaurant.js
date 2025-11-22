export class Restaurant {
    static nextRestaurantId = 0;

    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.restaurantId = ++Restaurant.nextRestaurantId;
        this.menu = [];
    }

    getName() {
        return this.name;
    }

    setName(n) {
        this.name = n;
    }

    getLocation() {
        return this.location;
    }

    setLocation(loc) {
        this.location = loc;
    }

    addMenuItem(item) {
        this.menu.push(item);
    }

    getMenu() {
        return this.menu;
    }
}
