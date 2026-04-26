// VendgingMachine will only have one state which will be singleton enum.
public enum VendingState {
    
    NO_COIN {
        @Override
        public VendingState insertCoin(VendingMachine machine, int coin) {
            machine.setInsertedCoin(coin);
            System.out.println("Coin inserted. Current balance: Rs " + coin);
            return HAS_COIN; 
        }
        @Override
        public VendingState selectItem(VendingMachine machine) {
            System.out.println("Please insert coin first!");
            return this;
        }
        @Override
        public VendingState dispense(VendingMachine machine) {
            System.out.println("Please insert coin and select item first!");
            return this;
        }
        @Override
        public VendingState returnCoin(VendingMachine machine) {
            System.out.println("No coin to return!");
            return this;
        }
        @Override
        public VendingState refill(VendingMachine machine, int quantity) {
            System.out.println("Items refilling");
            machine.incrementItemCount(quantity);
            return this;
        }
    },

    HAS_COIN {
        @Override
        public VendingState insertCoin(VendingMachine machine, int coin) {
            machine.addCoin(coin);
            System.out.println("Additional coin inserted. Current balance: Rs " + machine.getInsertedCoin());
            return this;
        }
        @Override
        public VendingState selectItem(VendingMachine machine) {
            if (machine.getInsertedCoin() >= machine.getPrice()) {
                System.out.println("Item selected. Dispensing...");
                int change = machine.getInsertedCoin() - machine.getPrice();
                if (change > 0) {
                    System.out.println("Change returned: Rs " + change);
                }
                machine.setInsertedCoin(0);
                return DISPENSING;
            } else {
                int needed = machine.getPrice() - machine.getInsertedCoin();
                System.out.println("Insufficient funds. Need Rs " + needed + " more.");
                return this;
            }
        }
        @Override
        public VendingState dispense(VendingMachine machine) {
            System.out.println("Please select an item first!");
            return this;
        }
        @Override
        public VendingState returnCoin(VendingMachine machine) {
            System.out.println("Coin returned: Rs " + machine.getInsertedCoin());
            machine.setInsertedCoin(0);
            return NO_COIN;
        }
        @Override
        public VendingState refill(VendingMachine machine, int quantity) {
            System.out.println("Can't refill in this state");
            return this;
        }
    },

    DISPENSING {
        @Override
        public VendingState insertCoin(VendingMachine machine, int coin) {
            System.out.println("Please wait, already dispensing item. Coin returned: Rs " + coin);
            return this;
        }
        @Override
        public VendingState selectItem(VendingMachine machine) {
            System.out.println("Already dispensing item. Please wait.");
            return this;
        }
        @Override
        public VendingState dispense(VendingMachine machine) {
            System.out.println("Item dispensed!");
            machine.decrementItemCount();
            if (machine.getItemCount() > 0) {
                return NO_COIN;
            } else {
                System.out.println("Machine is now sold out!");
                return SOLD_OUT;
            }
        }
        @Override
        public VendingState returnCoin(VendingMachine machine) {
            System.out.println("Cannot return coin while dispensing item!");
            return this;
        }
        @Override
        public VendingState refill(VendingMachine machine, int quantity) {
            System.out.println("Can't refill in this state");
            return this;
        }
    },

    SOLD_OUT {
        @Override
        public VendingState insertCoin(VendingMachine machine, int coin) {
            System.out.println("Machine is sold out. Coin returned: Rs " + coin);
            return this;
        }
        @Override
        public VendingState selectItem(VendingMachine machine) {
            System.out.println("Machine is sold out!");
            return this;
        }
        @Override
        public VendingState dispense(VendingMachine machine) {
            System.out.println("Machine is sold out!");
            return this;
        }
        @Override
        public VendingState returnCoin(VendingMachine machine) {
            System.out.println("Machine is sold out. No coin inserted.");
            return this;
        }
        @Override
        public VendingState refill(VendingMachine machine, int quantity) {
            System.out.println("Items refilling");
            machine.incrementItemCount(quantity);
            return NO_COIN;
        }
    };

    // Abstract methods that each enum constant must implement
    public abstract VendingState insertCoin(VendingMachine machine, int coin);
    public abstract VendingState selectItem(VendingMachine machine);
    public abstract VendingState dispense(VendingMachine machine);
    public abstract VendingState returnCoin(VendingMachine machine);
    public abstract VendingState refill(VendingMachine machine, int quantity);
}

// Context Class - Vending Machine
class VendingMachine {
    private VendingState currentState;
    private int itemCount;
    private int itemPrice;
    private int insertedCoins;
    
    public VendingMachine(int itemCount, int itemPrice) {
        this.itemCount = itemCount;
        this.itemPrice = itemPrice;
        this.insertedCoins = 0; 
    
        // Set initial state
        if (itemCount > 0) {
            this.currentState = VendginState.NO_COIN;
        } else {
            this.currentState = VendginState.SOLD_OUT;
        }
    }
    
    // Delegate to current state and update state based on return value
    public void insertCoin(int coin) {
        currentState = currentState.insertCoin(this, coin);
    }
    
    public void selectItem() {
        currentState = currentState.selectItem(this);
    }
    
    public void dispense() {
        currentState = currentState.dispense(this);
    }
    
    public void returnCoin() {
        currentState = currentState.returnCoin(this);
    }
    
    public void refill(int quantity) {
        currentState = currentState.refill(this, quantity);
    }
        
    // Print the status of Vending Machine
    public void printStatus() {
        System.out.println("\n--- Vending Machine Status ---");
        System.out.println("Items remaining: " + itemCount);
        System.out.println("Inserted coin: Rs " + insertedCoins);
        System.out.println("Current state: " + currentState.name() + "\n");
    }
    
    // Getters for states
    public VendingState getNoCoinState() { 
        return VendingState.NO_COIN;
    }
    public VendingState getHasCoinState() { 
        return VendingState.HAS_COIN;
    }
    public VendingState getDispenseState() { 
        return VendingState.DISPENSING; 
    }
    public VendingState getSoldOutState() { 
        return VendingState.SOLD_OUT;
    }
    
    // Data access methods
    public int getItemCount() { 
        return itemCount; 
    }
    public void decrementItemCount() { 
        itemCount--; 
    }
    public void incrementItemCount(int count) {
        itemCount += count;
    }
    public void incrementItemCount() {
        itemCount += 1;
    }
    public int getInsertedCoin() { 
        return insertedCoins;
    }
    public void setInsertedCoin(int coin) { 
        insertedCoins = coin;
    }
    public void addCoin(int coin) { 
        insertedCoins += coin;
    }
    public int getPrice() {
        return this.itemPrice;
    }
    public void setPrice(int itemPrice) {
        this.itemPrice = itemPrice;
    }
}

// Main class for Vending Machine
public class VendingMachineMain {
    public static void main(String[] args) {
        System.out.println("=== Water Bottle VENDING MACHINE ===");
        
        int itemCount = 2;
        int itemPrice = 20;

        VendingMachine machine = new VendingMachine(itemCount, itemPrice);
        machine.printStatus();
        
        // Test scenarios - each operation potentially changes state
        System.out.println("1. Trying to select item without coin:");
        machine.selectItem();  // Should ask for coin, no state change
        machine.printStatus();
        
        System.out.println("2. Inserting coin:");
        machine.insertCoin(10);  // State changes to HAS_COIN
        machine.printStatus();
        
        System.out.println("3. Selecting item with insufficient funds:");
        machine.selectItem();  // Insufficient funds, stays in HAS_COIN
        machine.printStatus();
        
        System.out.println("4. Adding more coins:");
        machine.insertCoin(10);  // Add more money, stays in HAS_COIN
        machine.printStatus();
        
        System.out.println("5. Selecting item Now");
        machine.selectItem();  // State changes to SOLD
        machine.printStatus();
        
        System.out.println("6. Dispensing item:");
        machine.dispense(); // State changes to NO_COIN (items remaining)
        machine.printStatus();
        
        System.out.println("7. Buying last item:");
        machine.insertCoin(20);  // State changes to HAS_COIN
        machine.selectItem();  // State changes to SOLD
        machine.dispense(); // State changes to SOLD_OUT (no items left)
        machine.printStatus();
        
        System.out.println("8. Trying to use sold out machine:");
        machine.insertCoin(5);  // Coin returned, stays in SOLD_OUT

        System.out.println("9. Trying to use sold out machine:");
        machine.refill(2);
        machine.printStatus(); // State changes NO_COIN
    }
}
