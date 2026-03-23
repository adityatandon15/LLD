import threading


class ThreadSafeLockingSingleton:
    _instance = None
    _lock = threading.Lock()

    def __init__(self):
        print("Singleton Constructor Called!")

    @classmethod
    def getInstance(cls):
        with cls._lock:  # Lock for thread safety
            if cls._instance is None:
                cls._instance = ThreadSafeLockingSingleton()
            return cls._instance


if __name__ == "__main__":
    s1 = ThreadSafeLockingSingleton.getInstance()
    s2 = ThreadSafeLockingSingleton.getInstance()

    print(s1 is s2)
