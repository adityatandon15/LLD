from abc import ABC, abstractmethod


# Observer interface
class ISubscriber(ABC):
    @abstractmethod
    def update(self):
        pass


# Observable interface
class IChannel(ABC):
    @abstractmethod
    def subscribe(self, subscriber):
        pass

    @abstractmethod
    def unsubscribe(self, subscriber):
        pass

    @abstractmethod
    def notify_subscribers(self):
        pass


# Concrete Subject
class Channel(IChannel):
    def __init__(self, name):
        self.name = name
        self.subscribers = []
        self.latest_video = None

    def subscribe(self, subscriber):
        if subscriber not in self.subscribers:
            self.subscribers.append(subscriber)

    def unsubscribe(self, subscriber):
        if subscriber in self.subscribers:
            self.subscribers.remove(subscriber)

    def notify_subscribers(self):
        for sub in self.subscribers:
            sub.update()

    def upload_video(self, title):
        self.latest_video = title
        print(f'\n[{self.name} uploaded "{title}"]')
        self.notify_subscribers()

    def get_video_data(self):
        return f'\nCheckout our new Video : {self.latest_video}\n'


# Concrete Observer
class Subscriber(ISubscriber):
    def __init__(self, name, channel):
        self.name = name
        self.channel = channel

    def update(self):
        print(f"Hey {self.name},{self.channel.get_video_data()}")


# Main
if __name__ == "__main__":
    # Create channel and subscribers
    channel = Channel("CoderArmy")

    subs1 = Subscriber("Varun", channel)
    subs2 = Subscriber("Tarun", channel)

    # Subscribe
    channel.subscribe(subs1)
    channel.subscribe(subs2)

    # Upload video
    channel.upload_video("Observer Pattern Tutorial")

    # Unsubscribe one
    channel.unsubscribe(subs1)

    # Upload another video
    channel.upload_video("Decorator Pattern Tutorial")