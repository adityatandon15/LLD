// IObserver.java
public interface IObserver<Data> {
    void update(Data data);
}

// IObservable.java
public interface IObservable<Data> {
    void add(IObserver<Data> o);
    void remove(IObserver<Data> o);
    void notifyObservers(Data data);
}

// StockData.java
public class StockData {
    private final String tickerSymbol;
    private final double price;

    public StockData(String tickerSymbol, double price) {
        this.tickerSymbol = tickerSymbol;
        this.price = price;
    }

    public String getTickerSymbol() { return tickerSymbol; }
    public double getPrice() { return price; }
}

import java.util.ArrayList;
import java.util.List;

// StockExchange.java
public class StockExchange implements IObservable<StockData> {
    private List<IObserver<StockData>> observers = new ArrayList<>();

    @Override
    public void add(IObserver<StockData> o) {
        observers.add(o);
    }

    @Override
    public void remove(IObserver<StockData> o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers(StockData data) {
        for (IObserver<StockData> observer : observers) {
            observer.update(data); // Type-safe execution
        }
    }

    // Real-world trigger method
    public void setStockPrice(String tickerSymbol, double newPrice) {
        System.out.println("\n[NYSE] Market Update: " + tickerSymbol + " is now $" + newPrice);
        notifyObservers(new StockData(tickerSymbol, newPrice));
    }
}
// MobileApp.java
public class MobileApp implements IObserver<StockData> {
    private String username;

    public MobileApp(String username) {
        this.username = username;
    }

    @Override
    public void update(StockData data) {
        // No type casting needed!
        System.out.println("Push Notification for " + username + ": " 
            + data.getTickerSymbol() + " changed to $" + data.getPrice());
    }
}

// TradingBot.java
public class TradingBot implements IObserver<StockData> {
    private String botId;

    public TradingBot(String botId) {
        this.botId = botId;
    }

    @Override
    public void update(StockData data) {
        System.out.println("Algo-Bot [" + botId + "] analyzing " 
            + data.getTickerSymbol() + " at $" + data.getPrice() + " for trade execution...");
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        // 1. Create the observable
        StockExchange nyse = new StockExchange();

        // 2. Create the observers
        MobileApp retailInvestor = new MobileApp("Alice");
        TradingBot wallStreetBot = new TradingBot("Bot-X99");

        // 3. Subscribe the observers
        nyse.add(retailInvestor);
        nyse.add(wallStreetBot);

        // 4. Simulate real-world changes
        nyse.setStockPrice("AAPL", 175.50);
        nyse.setStockPrice("GOOGL", 140.20);
        
        // 5. Unsubscribe someone and update again
        nyse.remove(retailInvestor);
        nyse.setStockPrice("TSLA", 210.00);
    }
}
