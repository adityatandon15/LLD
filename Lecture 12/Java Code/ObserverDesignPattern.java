import java.util.LinkedHashSet; //Order of insertion preserved unlike HashSet
import java.util.Set;           //O(1) insertion, and deletetion 

interface ISubscriber {
    void update();
}

// Observable interface: a YouTube channel interface
interface IChannel {
    void subscribe(ISubscriber subscriber);
    void unsubscribe(ISubscriber subscriber);
    void notifySubscribers();
}

// Concrete Subject: a YouTube channel that observers can subscribe to
class Channel implements IChannel {
    private Set<ISubscriber> subscribers;
    private String name;
    private String latestVideo;

    public Channel(String name) {
        this.name = name;
        this.subscribers = new LinkedHashSet<>();
    }

    @Override
    public void subscribe(ISubscriber subscriber) {
        //The Set handles duplicates automatically in O(1) time
        subscribers.add(subscriber);
    }

    @Override
    public void unsubscribe(ISubscriber subscriber) {
        // 3. Removal is now O(1) instead of O(N)
        subscribers.remove(subscriber);
    }

    @Override
    public void notifySubscribers() {
        for (ISubscriber sub : subscribers) {
            sub.update();
        }
    }

    public void uploadVideo(String title) {
        latestVideo = title;
        System.out.println("\n[" + name + " uploaded \"" + title + "\"]");
        notifySubscribers();
    }

    public String getVideoData() {
        return "\nCheckout our new Video : " + latestVideo + "\n";
    }
}

// Concrete Observer: represents a subscriber to the channel
class Subscriber implements ISubscriber {
    private String name;
    private Channel channel;

    public Subscriber(String name, Channel channel) {
        this.name = name;
        this.channel = channel;
    }

    @Override
    public void update() {
        System.out.println("Hey " + name + "," + channel.getVideoData());
    }
}

public class ObserverDesignPattern {
    public static void main(String[] args) {
        // Create a channel and subscribers
        Channel channel = new Channel("CoderArmy");

        Subscriber subs1 = new Subscriber("Varun", channel);
        Subscriber subs2 = new Subscriber("Tarun", channel);

        // Varun and Tarun subscribe to CoderArmy
        channel.subscribe(subs1);
        channel.subscribe(subs2);

        // Upload a video: both Varun and Tarun are notified
        channel.uploadVideo("Observer Pattern Tutorial");

        // Varun unsubscribes; Tarun remains subscribed
        channel.unsubscribe(subs1);

        // Upload another video: only Tarun is notified
        channel.uploadVideo("Decorator Pattern Tutorial");
    }
}


