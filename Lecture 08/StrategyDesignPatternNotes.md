### Strategy Design Pattern (Simple Explanation)

The **Strategy Pattern** is used when you have **multiple ways to do the same task**, and you want to choose one at runtime.

👉 Instead of writing many `if-else` conditions, you create separate classes for each behavior and switch them easily.

---

### 🔹 Real-Life Example: Payment System

Imagine you are building a payment system.
A user can pay using:

* Credit Card
* UPI
* PayPal

Instead of this 👇

```java
if(type.equals("card")) { ... }
else if(type.equals("upi")) { ... }
else if(type.equals("paypal")) { ... }
```

We use Strategy Pattern.

---

### Step 1: Create Strategy Interface

```java
interface PaymentStrategy {
    void pay(int amount);
}
```

---

### Step 2: Create Different Strategies

```java
class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card");
    }
}

class UPIPayment implements PaymentStrategy {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using UPI");
    }
}
```

---

### Step 3: Context Class

```java
class PaymentContext {
    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void payAmount(int amount) {
        strategy.pay(amount);
    }
}
```

---

### Step 4: Use It

```java
PaymentContext context = new PaymentContext();

context.setStrategy(new CreditCardPayment());
context.payAmount(1000);

context.setStrategy(new UPIPayment());
context.payAmount(500);
```

---

### 🔥 In One Line

Strategy Pattern = **Encapsulate different algorithms and make them interchangeable at runtime.**

-------------
## How it is asked in interviews 🚀

Good 👍 Let’s do this in an **interview-style way** — clean explanation + practical backend example.

---

# 🎯 Interview Example: Discount Engine in E-Commerce

### 🧠 Problem Statement (What interviewer says)

> “Design a system where users can apply different types of discounts:
>
> * No Discount
> * Percentage Discount
> * Fixed Amount Discount
> * Festival Special Discount
>   And we should be able to add new discount types without modifying existing code.”

---

## ❌ Bad Approach (What most people write first)

```java
if(discountType.equals("NONE")) { ... }
else if(discountType.equals("PERCENTAGE")) { ... }
else if(discountType.equals("FIXED")) { ... }
else if(discountType.equals("FESTIVAL")) { ... }
```

### Problem:

* Violates **Open/Closed Principle**
* Every new discount → modify existing code
* Becomes messy in real systems

---

# ✅ Strategy Pattern Approach

---

## 1️⃣ Step 1: Create Strategy Interface

```java
interface DiscountStrategy {
    double applyDiscount(double amount);
}
```

---

## 2️⃣ Step 2: Concrete Strategies

### No Discount

```java
class NoDiscount implements DiscountStrategy {
    public double applyDiscount(double amount) {
        return amount;
    }
}
```

### Percentage Discount

```java
class PercentageDiscount implements DiscountStrategy {
    private double percentage;

    public PercentageDiscount(double percentage) {
        this.percentage = percentage;
    }

    public double applyDiscount(double amount) {
        return amount - (amount * percentage / 100);
    }
}
```

### Fixed Discount

```java
class FixedDiscount implements DiscountStrategy {
    private double discountAmount;

    public FixedDiscount(double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public double applyDiscount(double amount) {
        return amount - discountAmount;
    }
}
```

---

## 3️⃣ Step 3: Context Class

```java
class ShoppingCart {
    private DiscountStrategy discountStrategy;

    public void setDiscountStrategy(DiscountStrategy strategy) {
        this.discountStrategy = strategy;
    }

    public double checkout(double amount) {
        return discountStrategy.applyDiscount(amount);
    }
}
```

---

## 4️⃣ Step 4: Usage

```java
ShoppingCart cart = new ShoppingCart();

cart.setDiscountStrategy(new PercentageDiscount(10));
System.out.println(cart.checkout(1000));  // 900

cart.setDiscountStrategy(new FixedDiscount(200));
System.out.println(cart.checkout(1000));  // 800
```

---

# 🧠 How to Explain in Interview (Strong Answer)

You can say:

> “Strategy pattern helps when multiple algorithms exist for the same behavior.
> Instead of using conditionals, we encapsulate each algorithm in its own class and inject it at runtime.
> This makes the system extensible and follows Open/Closed Principle.”

---

# 🔥 Real Backend Use Cases

As a backend engineer (microservices / Java), this is used in:

* Payment gateway selection
* Authentication mechanisms (OAuth, JWT, API Key)
* Sorting logic
* Tax calculation per country
* Shipping cost calculation
* Fraud detection rules

---

# 💡 Advanced Interview Tip (To Impress)

If interviewer asks:

> “How would you avoid calling setStrategy manually?”

You say:

* Use **Factory Pattern + Strategy**
* Or inject strategy using **Spring Dependency Injection**
* Or select strategy via Map<String, Strategy>

Example:

```java
Map<String, DiscountStrategy> strategyMap;
```

Then choose at runtime without if-else.

---

# 🚀 Final One-Line Summary

Strategy Pattern =
**Move changing behavior into separate classes and switch them dynamically without modifying existing code.**

---
