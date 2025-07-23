from abc import ABC, abstractmethod


# Observer interface: represents a subscriber
class ISubscriber(ABC):
    @abstractmethod
    def update(self):
        pass


# Observable interface: represents a YouTube channel
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


# Concrete Subject: a YouTube channel that observers can subscribe to
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
        for subscriber in self.subscribers:
            subscriber.update()

    def upload_video(self, title):
        self.latest_video = title
        print(f"\n[{self.name} uploaded \"{title}\"]")
        self.notify_subscribers()

    def get_video_data(self):
        return f"\nCheckout our new Video: {self.latest_video}\n"


# Concrete Observer: represents a subscriber to the channel
class Subscriber(ISubscriber):
    def __init__(self, name, channel):
        self.name = name
        self.channel = channel

    def update(self):
        print(f"Hey {self.name},{self.channel.get_video_data()}")


# Main function to demonstrate the Observer Design Pattern
if __name__ == "__main__":
    # Create a channel and subscribers
    channel = Channel("CoderArmy")

    subs1 = Subscriber("Varun", channel)
    subs2 = Subscriber("Tarun", channel)

    # Varun and Tarun subscribe to CoderArmy
    channel.subscribe(subs1)
    channel.subscribe(subs2)

    # Upload a video: both Varun and Tarun are notified
    channel.upload_video("Observer Pattern Tutorial")

    # Varun unsubscribes; Tarun remains subscribed
    channel.unsubscribe(subs1)

    # Upload another video: only Tarun is notified
    channel.upload_video("Decorator Pattern Tutorial")