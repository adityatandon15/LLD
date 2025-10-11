# Single Responsibility Principle (SRP) - Practice Questions

## Instructions
For each question:
1. Identify if SRP is violated
2. List all the responsibilities you find
3. Suggest how to fix it (if violated)
4. Write the corrected code

---

## Question 1: User Authentication (Easy)

```javascript
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    login() {
        // Validate credentials
        if (this.password.length < 8) {
            return false;
        }
        return true;
    }

    sendWelcomeEmail() {
        console.log(`Sending welcome email to ${this.username}`);
    }

    saveToDatabase() {
        console.log(`Saving user ${this.username} to database`);
    }

    generateReport() {
        console.log(`User Report for ${this.username}`);
        console.log(`Password length: ${this.password.length}`);
    }
}
```

**Questions:**
- Does this violate SRP? Why or why not?
- How many responsibilities does this class have?
- How would you refactor it?

---

## Question 2: Book Library System (Easy)

```javascript
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    printBookDetails() {
        console.log(`${this.title} by ${this.author}`);
    }

    saveBookToFile() {
        console.log(`Saving book ${this.isbn} to file...`);
    }

    findBookInLibrary(isbn) {
        console.log(`Searching for ISBN: ${isbn}`);
        // Search logic
    }
}
```

**Questions:**
- Identify all responsibilities
- Which methods violate SRP?
- Propose separate classes

---

## Question 3: Employee Management (Medium)

```javascript
class Employee {
    constructor(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    calculateSalary() {
        return this.salary * 1.1; // 10% bonus
    }

    calculateTax() {
        return this.salary * 0.2; // 20% tax
    }

    printPayslip() {
        console.log(`Payslip for ${this.name}`);
        console.log(`Gross: Rs ${this.calculateSalary()}`);
        console.log(`Tax: Rs ${this.calculateTax()}`);
    }

    saveEmployee() {
        console.log(`Saving employee ${this.name} to database`);
    }

    sendPayslipEmail() {
        console.log(`Emailing payslip to ${this.name}`);
    }
}
```

**Questions:**
- How many different reasons would this class change?
- Group methods by responsibility
- Design the refactored structure

---

## Question 4: Order Processing (Medium)

```javascript
class Order {
    constructor(orderId, items) {
        this.orderId = orderId;
        this.items = items;
        this.status = "pending";
    }

    addItem(item) {
        this.items.push(item);
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    applyDiscount(percentage) {
        const total = this.calculateTotal();
        return total - (total * percentage / 100);
    }

    printReceipt() {
        console.log(`Order #${this.orderId}`);
        this.items.forEach(item => console.log(item.name));
        console.log(`Total: Rs ${this.calculateTotal()}`);
    }

    sendConfirmationSMS() {
        console.log(`SMS: Your order #${this.orderId} is confirmed`);
    }

    saveToDatabase() {
        console.log(`Saving order ${this.orderId}...`);
    }

    notifyWarehouse() {
        console.log(`Notifying warehouse about order ${this.orderId}`);
    }
}
```

**Questions:**
- What are ALL the responsibilities here?
- Which methods belong together?
- Create separate classes following SRP

---

## Question 5: Does This Follow SRP? (Tricky)

```javascript
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getItems() {
        return this.items;
    }

    calculateSubtotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    calculateTax() {
        return this.calculateSubtotal() * 0.18;
    }

    calculateTotal() {
        return this.calculateSubtotal() + this.calculateTax();
    }

    clearCart() {
        this.items = [];
    }
}
```

**Questions:**
- Does this follow SRP? (Think carefully!)
- If yes, explain why. If no, explain what's wrong.
- What is the ONE responsibility here?

---

## Question 6: Student Grade System (Medium)

```javascript
class Student {
    constructor(name, rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grades = [];
    }

    addGrade(subject, marks) {
        this.grades.push({ subject, marks });
    }

    calculateAverage() {
        const total = this.grades.reduce((sum, g) => sum + g.marks, 0);
        return total / this.grades.length;
    }

    getGrade() {
        const avg = this.calculateAverage();
        if (avg >= 90) return 'A';
        if (avg >= 75) return 'B';
        if (avg >= 60) return 'C';
        return 'F';
    }

    printReportCard() {
        console.log(`Report Card: ${this.name}`);
        this.grades.forEach(g => {
            console.log(`${g.subject}: ${g.marks}`);
        });
        console.log(`Grade: ${this.getGrade()}`);
    }

    saveToDatabase() {
        console.log(`Saving student ${this.rollNumber} to DB`);
    }

    sendReportToParents() {
        console.log(`Emailing report card to parents of ${this.name}`);
    }
}
```

**Questions:**
- Identify the violations
- What responsibilities should be separated?
- Refactor into separate classes

---

## Question 7: Blog Post Manager (Hard)

```javascript
class BlogPost {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.publishedDate = null;
    }

    publish() {
        this.publishedDate = new Date();
    }

    getWordCount() {
        return this.content.split(' ').length;
    }

    formatAsHTML() {
        return `<article>
            <h1>${this.title}</h1>
            <p>${this.content}</p>
            <span>By ${this.author}</span>
        </article>`;
    }

    formatAsMarkdown() {
        return `# ${this.title}\n\n${this.content}\n\n*By ${this.author}*`;
    }

    saveToDisk(filename) {
        console.log(`Saving to ${filename}`);
    }

    loadFromDisk(filename) {
        console.log(`Loading from ${filename}`);
    }

    sendNotificationToSubscribers() {
        console.log(`Notifying subscribers about: ${this.title}`);
    }

    trackPageViews() {
        console.log(`Tracking analytics for ${this.title}`);
    }
}
```

**Questions:**
- List ALL distinct responsibilities
- This is complex - how many classes should it become?
- Design the complete refactored structure

---

## Question 8: Smart Home Device (Hard)

```javascript
class SmartThermostat {
    constructor(location) {
        this.location = location;
        this.currentTemp = 20;
        this.targetTemp = 22;
    }

    setTargetTemperature(temp) {
        this.targetTemp = temp;
    }

    getCurrentTemperature() {
        return this.currentTemp;
    }

    adjustTemperature() {
        if (this.currentTemp < this.targetTemp) {
            console.log("Heating...");
        } else {
            console.log("Cooling...");
        }
    }

    logTemperatureHistory() {
        console.log(`Logging temp data for ${this.location}`);
    }

    sendAlertToPhone(message) {
        console.log(`Sending alert: ${message}`);
    }

    saveSettingsToCloud() {
        console.log("Syncing settings to cloud...");
    }

    detectPresence() {
        console.log("Checking if anyone is home...");
    }

    optimizeEnergyUsage() {
        console.log("Running energy optimization algorithm...");
    }
}
```

**Questions:**
- How many different concerns/responsibilities?
- Group related methods
- Propose a multi-class design

---

## Question 9: Payment Processor (Very Hard)

```javascript
class PaymentProcessor {
    constructor(customerId, amount) {
        this.customerId = customerId;
        this.amount = amount;
        this.status = "pending";
    }

    validateCardNumber(cardNumber) {
        // Validation logic
        return cardNumber.length === 16;
    }

    validateCVV(cvv) {
        return cvv.length === 3;
    }

    processPayment(cardNumber, cvv) {
        if (!this.validateCardNumber(cardNumber)) {
            console.log("Invalid card");
            return false;
        }
        if (!this.validateCVV(cvv)) {
            console.log("Invalid CVV");
            return false;
        }
        
        console.log("Processing payment...");
        this.status = "completed";
        return true;
    }

    calculateProcessingFee() {
        return this.amount * 0.02; // 2% fee
    }

    applyRefund() {
        console.log(`Refunding ${this.amount}`);
        this.status = "refunded";
    }

    sendReceiptEmail(email) {
        console.log(`Sending receipt to ${email}`);
    }

    logTransaction() {
        console.log(`Logging transaction for customer ${this.customerId}`);
    }

    saveToDatabase() {
        console.log("Saving payment record...");
    }

    notifyFraudDetection() {
        console.log("Checking for fraud...");
    }

    generateInvoicePDF() {
        console.log("Creating PDF invoice...");
    }

    sendSMSConfirmation(phone) {
        console.log(`SMS to ${phone}: Payment successful`);
    }
}
```

**Questions:**
- This is heavily violated! How many responsibilities?
- Create a comprehensive refactored design
- Consider: validation, processing, notifications, persistence, reporting

---

## Question 10: Is This Good or Bad? (Critical Thinking)

```javascript
// Design A
class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return a / b; }
    power(a, b) { return Math.pow(a, b); }
    squareRoot(a) { return Math.sqrt(a); }
    percentage(value, total) { return (value / total) * 100; }
}

// Design B
class AdditionCalculator {
    add(a, b) { return a + b; }
}
class SubtractionCalculator {
    subtract(a, b) { return a - b; }
}
class MultiplicationCalculator {
    multiply(a, b) { return a * b; }
}
// ... etc

// Design C
class MathOperations {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return a / b; }
}

class AdvancedMathOperations {
    power(a, b) { return Math.pow(a, b); }
    squareRoot(a) { return Math.sqrt(a); }
    logarithm(a) { return Math.log(a); }
}
```

**Questions:**
- Which design (A, B, or C) follows SRP best? Why?
- What's wrong with the other designs?
- Is it possible to over-apply SRP? When?
- What's the balance between SRP and practicality?

---

## Bonus Challenge!

Take your `ShoppingCart` example and extend it with these features while maintaining SRP:
1. Apply coupon codes
2. Calculate shipping costs
3. Send order tracking emails
4. Generate PDF receipts
5. Handle returns/refunds
6. Maintain purchase history

How many classes will you need? Design the complete system!

---

## Tips for Practicing

1. **Ask yourself**: "Why would this class need to change?"
2. **Look for**: Different domains (DB, UI, business logic, notifications)
3. **Group**: Methods that serve the same responsibility
4. **Refactor**: Separate classes with single purpose
5. **Use**: Composition/dependency injection to connect classes

Good luck! 🚀

