# Method Argument Rule:
# Subtype method arguments can be identical or wider than the supertype.

class Parent:
    def print(self, msg):
        print(f"Parent: {msg}")

class Child(Parent):
    def print(self, msg):
        print(f"Child: {msg}")

class Client:
    def __init__(self, parent):
        self.parent = parent

    def print_msg(self):
        self.parent.print("Hello")

if __name__ == "__main__":
    parent = Parent()
    child = Child()

    client = Client(child)
    client.print_msg()