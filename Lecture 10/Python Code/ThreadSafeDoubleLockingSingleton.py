import threading


class ThreadSafeDoubleLockingSingleton:
    _instance = None
    _lock = threading.Lock()

    def __init__(self):
        print("Singleton Constructor Called!")

    @classmethod
    def get_instance(cls):
        # First check (no locking)
        if cls._instance is None:
            with cls._lock:  # Lock only if needed
                # Second check (after acquiring lock)
                if cls._instance is None:
                    cls._instance = cls()
        return cls._instance


if __name__ == "__main__":
    s1 = ThreadSafeDoubleLockingSingleton.get_instance()
    s2 = ThreadSafeDoubleLockingSingleton.get_instance()

    print(s1 is s2)
