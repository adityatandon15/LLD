class RestaurantManager:
    _instance = None

    def __init__(self):
        self.restaurants = []

    @staticmethod
    def get_instance():
        if RestaurantManager._instance is None:
            RestaurantManager._instance = RestaurantManager()
        return RestaurantManager._instance

    def add_restaurant(self, restaurant):
        self.restaurants.append(restaurant)

    def search_by_location(self, location):
        location = location.lower()
        return [r for r in self.restaurants if r.get_location().lower() == location]