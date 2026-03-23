class SimpleSingleton:
    instance = None

    def __init__(self):
        print("Singleton Constructor called")

    @classmethod
    def get_instance(cls):
        if cls.instance is None:
            cls.instance = SimpleSingleton()
        return cls.instance


if __name__ == "__main__":
    s1 = SimpleSingleton.get_instance()
    s2 = SimpleSingleton.get_instance()

    print(s1 is s2)
