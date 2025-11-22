export class RestaurantManager {
    constructor() {
        if (RestaurantManager.instance) {
            return RestaurantManager.instance;
        }
        this.restaurants = [];
        RestaurantManager.instance = this;
    }

    static getInstance() {
        if (!RestaurantManager.instance) {
            RestaurantManager.instance = new RestaurantManager();
        }
        return RestaurantManager.instance;
    }

    addRestaurant(r) {
        this.restaurants.push(r);
    }

    searchByLocation(loc) {
        const result = [];
        loc = loc.toLowerCase();
        for (const r of this.restaurants) {
            const rl = r.getLocation().toLowerCase();
            if (rl === loc) {
                result.push(r);
            }
        }
        return result;
    }
}
