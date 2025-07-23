class SimpleSingleton:
    _instance = None
    
    def __init__(self):
        print("Singleton Constructor called")
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = SimpleSingleton()
        return cls._instance

if __name__ == "__main__":
    s1 = SimpleSingleton.get_instance()
    s2 = SimpleSingleton.get_instance()
    
    print(s1 is s2)
    