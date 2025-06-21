# Abstraction (Interface)
class Database:
    def save(self, data):
        pass

# MySQL implementation (Low-level module)
class MySQLDatabase(Database):
    def save(self, data):
        print(f"Executing SQL Query: INSERT INTO users VALUES('{data}');")

# MongoDB implementation (Low-level module)
class MongoDBDatabase(Database):
    def save(self, data):
        print(f"Executing MongoDB Function: db.users.insert({{name: '{data}'}})")

# High-level module (Now loosely coupled via Dependency Injection)
class UserService:
    def __init__(self, database: Database):
        self.db = database

    def store_user(self, user):
        self.db.save(user)

if __name__ == "__main__":
    mysql = MySQLDatabase()
    mongodb = MongoDBDatabase()

    service1 = UserService(mysql)
    service1.store_user("Aditya")

    service2 = UserService(mongodb)
    service2.store_user("Rohit")