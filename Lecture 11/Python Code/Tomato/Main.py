from TomatoApp import TomatoApp
from models.User import User

if __name__ == "__main__":
    # Simulating a happy flow
    tomato = TomatoApp()

    # Simulate a user coming in
    user = User(101, "Aditya", "Delhi")
    print(f"User: {user.get_name()} is active.")

    # User searches for restaurants by location
    restaurant_list = tomato.search_restaurants("Delhi")

    if not restaurant_list:
        print("No restaurants found!")
    else:
        print("Found Restaurants:")
        for restaurant in restaurant_list:
            print(f" - {restaurant.get_name()}")

        # User selects a restaurant
        tomato.select_restaurant(user, restaurant_list[0])
        print(f"Selected restaurant: {restaurant_list[0].get_name()}")