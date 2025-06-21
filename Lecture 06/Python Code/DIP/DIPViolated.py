class MySQLDatabase:  # Low-level module
    def save_to_sql(self, data):
        print(f"Executing SQL Query: INSERT INTO users VALUES('{data}');")

class MongoDBDatabase:  # Low-level module
    def save_to_mongo(self, data):
        print(f"Executing MongoDB Function: db.users.insert({{name: '{data}'}})")

class UserService:  # High-level module (Tightly coupled)
    def __init__(self):
        self.sql_db = MySQLDatabase()
        self.mongo_db = MongoDBDatabase()

    def store_user_to_sql(self, user):
        self.sql_db.save_to_sql(user)

    def store_user_to_mongo(self, user):
        self.mongo_db.save_to_mongo(user)

if __name__ == "__main__":
    service = UserService()
    service.store_user_to_sql("Aditya")
    service.store_user_to_mongo("Rohit")