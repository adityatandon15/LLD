class NoSingleton:
    def __init__(self):
        print("Singleton Constructor called. New Object created.")


if __name__ == "__main__":
    s1 = NoSingleton()
    s2 = NoSingleton()

    print(s1 == s2)
