from abc import ABC, abstractmethod

class OrderFactory(ABC):
    @abstractmethod
    def create_order(self, user, cart):
        pass