class ThreadSafeEagerSingleton:
    # Eager instance creation (class variable)
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ThreadSafeEagerSingleton, cls).__new__(cls)
            print("Singleton Constructor Called!")
        return cls._instance

    @staticmethod
    def get_instance():
        return ThreadSafeEagerSingleton()

if __name__ == "__main__":
    s1 = ThreadSafeEagerSingleton.get_instance()
    s2 = ThreadSafeEagerSingleton.get_instance()

    print(s1 is s2)
