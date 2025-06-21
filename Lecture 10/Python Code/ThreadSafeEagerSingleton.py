import threading

class ThreadSafeLazySingleton:
    _instance = None
    _lock = threading.Lock()  # A lock object to ensure thread safety

    def __init__(self):
        if ThreadSafeLazySingleton._instance is not None:
            raise RuntimeError("Use get_instance() instead")
        print("Singleton Constructor Called!")

    @classmethod
    def get_instance(cls):
        if cls._instance is None:  # First check (not locked)
            with cls._lock:  # Locking to ensure only one thread creates the instance
                if cls._instance is None:  # Second check (locked)
                    cls._instance = cls()
        return cls._instance

if __name__ == "__main__":
    # Example usage
    def create_singleton():
        singleton = ThreadSafeLazySingleton.get_instance()
        print(f"Singleton instance: {singleton}")

    # Simulate multiple threads trying to access the singleton
    threads = [threading.Thread(target=create_singleton) for _ in range(5)]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()