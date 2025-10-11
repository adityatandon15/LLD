# Single Responsibility Principle (SRP) - Solutions

**⚠️ Try the questions first before looking at these solutions!**

---

## Solution 1: User Authentication

**Analysis:**
- ✅ Violates SRP
- Has 4 responsibilities:
  1. User data management (constructor, properties)
  2. Authentication logic (login)
  3. Email sending (sendWelcomeEmail)
  4. Database operations (saveToDatabase)
  5. Reporting (generateReport)

**Refactored Code:**

```javascript
// 1. User data only
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }
}

// 2. Authentication logic
class UserAuthenticator {
    login(user, password) {
        if (password.length < 8) {
            return false;
        }
        return true;
    }
}

// 3. Email service
class UserEmailService {
    sendWelcomeEmail(user) {
        console.log(`Sending welcome email to ${user.username}`);
    }
}

// 4. Database operations
class UserRepository {
    saveToDatabase(user) {
        console.log(`Saving user ${user.username} to database`);
    }
}

// 5. Report generation
class UserReportGenerator {
    generateReport(user) {
        console.log(`User Report for ${user.username}`);
    }
}
```

---

## Solution 2: Book Library System

**Analysis:**
- ✅ Violates SRP
- Responsibilities:
  1. Book data (title, author, isbn, getters)
  2. Printing/Display (printBookDetails)
  3. File operations (saveBookToFile)
  4. Search operations (findBookInLibrary)

**Refactored Code:**

```javascript
// 1. Book data
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

    getISBN() {
        return this.isbn;
    }
}

// 2. Book printer
class BookPrinter {
    printBookDetails(book) {
        console.log(`${book.getTitle()} by ${book.getAuthor()}`);
    }
}

// 3. Book storage
class BookStorage {
    saveBookToFile(book) {
        console.log(`Saving book ${book.getISBN()} to file...`);
    }
}

// 4. Library search
class LibrarySearch {
    findBookByISBN(isbn, books) {
        console.log(`Searching for ISBN: ${isbn}`);
        return books.find(book => book.getISBN() === isbn);
    }
}
```

---

## Solution 3: Employee Management

**Analysis:**
- ✅ Violates SRP
- Responsibilities:
  1. Employee data
  2. Salary calculations
  3. Tax calculations
  4. Payslip printing
  5. Database operations
  6. Email notifications

**Refactored Code:**

```javascript
// 1. Employee data
class Employee {
    constructor(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}

// 2. Salary calculator
class SalaryCalculator {
    calculateGrossSalary(employee) {
        return employee.salary * 1.1; // 10% bonus
    }

    calculateTax(employee) {
        return employee.salary * 0.2; // 20% tax
    }
}

// 3. Payslip printer
class PayslipPrinter {
    constructor(salaryCalculator) {
        this.calculator = salaryCalculator;
    }

    printPayslip(employee) {
        console.log(`Payslip for ${employee.name}`);
        console.log(`Gross: Rs ${this.calculator.calculateGrossSalary(employee)}`);
        console.log(`Tax: Rs ${this.calculator.calculateTax(employee)}`);
    }
}

// 4. Employee repository
class EmployeeRepository {
    saveEmployee(employee) {
        console.log(`Saving employee ${employee.name} to database`);
    }
}

// 5. Email service
class PayslipEmailService {
    sendPayslipEmail(employee) {
        console.log(`Emailing payslip to ${employee.name}`);
    }
}
```

---

## Solution 4: Order Processing

**Analysis:**
- ✅ Violates SRP
- Responsibilities:
  1. Order data management (orderId, items, status, addItem)
  2. Pricing calculations (calculateTotal, applyDiscount)
  3. Receipt printing (printReceipt)
  4. SMS notifications (sendConfirmationSMS)
  5. Database operations (saveToDatabase)
  6. Warehouse operations (notifyWarehouse)

**Refactored Code:**

```javascript
// 1. Order data
class Order {
    constructor(orderId, items) {
        this.orderId = orderId;
        this.items = items;
        this.status = "pending";
    }

    addItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    setStatus(status) {
        this.status = status;
    }
}

// 2. Price calculator
class OrderPriceCalculator {
    calculateTotal(order) {
        return order.items.reduce((sum, item) => sum + item.price, 0);
    }

    applyDiscount(order, percentage) {
        const total = this.calculateTotal(order);
        return total - (total * percentage / 100);
    }
}

// 3. Receipt printer
class ReceiptPrinter {
    constructor(priceCalculator) {
        this.priceCalculator = priceCalculator;
    }

    printReceipt(order) {
        console.log(`Order #${order.orderId}`);
        order.items.forEach(item => console.log(item.name));
        console.log(`Total: Rs ${this.priceCalculator.calculateTotal(order)}`);
    }
}

// 4. SMS notification service
class OrderSMSService {
    sendConfirmationSMS(order) {
        console.log(`SMS: Your order #${order.orderId} is confirmed`);
    }
}

// 5. Order repository
class OrderRepository {
    saveToDatabase(order) {
        console.log(`Saving order ${order.orderId}...`);
    }
}

// 6. Warehouse notifier
class WarehouseNotifier {
    notifyWarehouse(order) {
        console.log(`Notifying warehouse about order ${order.orderId}`);
    }
}
```

---

## Solution 5: Does This Follow SRP?

**Analysis:**
- ✅ **YES, this FOLLOWS SRP!**
- Single Responsibility: **Shopping cart management and pricing logic**
- All methods serve cart-related business logic:
  - `addItem`, `removeItem`, `getItems` → Cart management
  - `calculateSubtotal`, `calculateTax`, `calculateTotal` → Cart pricing
  - `clearCart` → Cart management

**Why it's correct:**
- All calculations are cart business rules
- No printing, no database, no email - just cart logic
- Would only change if cart rules change (one reason)

**This is a GOOD example of SRP!**

---

## Solution 6: Student Grade System

**Analysis:**
- ✅ Violates SRP
- Responsibilities:
  1. Student data
  2. Grade management
  3. Grade calculations
  4. Report card printing
  5. Database operations
  6. Email notifications

**Refactored Code:**

```javascript
// 1. Student data
class Student {
    constructor(name, rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grades = [];
    }

    addGrade(subject, marks) {
        this.grades.push({ subject, marks });
    }

    getGrades() {
        return this.grades;
    }
}

// 2. Grade calculator
class GradeCalculator {
    calculateAverage(student) {
        const grades = student.getGrades();
        const total = grades.reduce((sum, g) => sum + g.marks, 0);
        return total / grades.length;
    }

    getLetterGrade(student) {
        const avg = this.calculateAverage(student);
        if (avg >= 90) return 'A';
        if (avg >= 75) return 'B';
        if (avg >= 60) return 'C';
        return 'F';
    }
}

// 3. Report card printer
class ReportCardPrinter {
    constructor(gradeCalculator) {
        this.calculator = gradeCalculator;
    }

    printReportCard(student) {
        console.log(`Report Card: ${student.name}`);
        student.getGrades().forEach(g => {
            console.log(`${g.subject}: ${g.marks}`);
        });
        console.log(`Grade: ${this.calculator.getLetterGrade(student)}`);
    }
}

// 4. Student repository
class StudentRepository {
    saveToDatabase(student) {
        console.log(`Saving student ${student.rollNumber} to DB`);
    }
}

// 5. Parent notification service
class ParentNotificationService {
    sendReportToParents(student) {
        console.log(`Emailing report card to parents of ${student.name}`);
    }
}
```

---

## Solution 7: Blog Post Manager

**Analysis:**
- ✅ Heavily violates SRP
- Responsibilities:
  1. Blog post data (title, content, author, publish)
  2. Content analysis (getWordCount)
  3. HTML formatting
  4. Markdown formatting
  5. File persistence
  6. Notification service
  7. Analytics tracking

**Refactored Code:**

```javascript
// 1. Blog post data
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

    isPublished() {
        return this.publishedDate !== null;
    }
}

// 2. Content analyzer
class ContentAnalyzer {
    getWordCount(blogPost) {
        return blogPost.content.split(' ').length;
    }
}

// 3. HTML formatter
class HTMLFormatter {
    format(blogPost) {
        return `<article>
            <h1>${blogPost.title}</h1>
            <p>${blogPost.content}</p>
            <span>By ${blogPost.author}</span>
        </article>`;
    }
}

// 4. Markdown formatter
class MarkdownFormatter {
    format(blogPost) {
        return `# ${blogPost.title}\n\n${blogPost.content}\n\n*By ${blogPost.author}*`;
    }
}

// 5. File storage
class BlogPostFileStorage {
    saveToDisk(blogPost, filename) {
        console.log(`Saving to ${filename}`);
    }

    loadFromDisk(filename) {
        console.log(`Loading from ${filename}`);
    }
}

// 6. Subscriber notifier
class SubscriberNotifier {
    sendNotification(blogPost) {
        console.log(`Notifying subscribers about: ${blogPost.title}`);
    }
}

// 7. Analytics tracker
class BlogAnalytics {
    trackPageViews(blogPost) {
        console.log(`Tracking analytics for ${blogPost.title}`);
    }
}
```

---

## Solution 8: Smart Home Device

**Analysis:**
- ✅ Violates SRP
- Responsibilities:
  1. Temperature control
  2. Data logging
  3. Notifications
  4. Cloud sync
  5. Presence detection
  6. Energy optimization

**Refactored Code:**

```javascript
// 1. Thermostat control
class Thermostat {
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
}

// 2. Temperature logger
class TemperatureLogger {
    logTemperatureHistory(thermostat) {
        console.log(`Logging temp data for ${thermostat.location}`);
    }
}

// 3. Notification service
class ThermostatNotifier {
    sendAlertToPhone(message) {
        console.log(`Sending alert: ${message}`);
    }
}

// 4. Cloud sync service
class ThermostatCloudSync {
    saveSettingsToCloud(thermostat) {
        console.log("Syncing settings to cloud...");
    }
}

// 5. Presence detector
class PresenceDetector {
    detectPresence() {
        console.log("Checking if anyone is home...");
        return true; // or false
    }
}

// 6. Energy optimizer
class EnergyOptimizer {
    optimizeUsage(thermostat, presenceDetected) {
        console.log("Running energy optimization algorithm...");
    }
}
```

---

## Solution 9: Payment Processor

**Analysis:**
- ✅ Heavily violates SRP
- Responsibilities:
  1. Payment data
  2. Card validation
  3. Payment processing
  4. Fee calculation
  5. Refunds
  6. Email notifications
  7. SMS notifications
  8. Transaction logging
  9. Database persistence
  10. Fraud detection
  11. PDF generation

**Refactored Code:**

```javascript
// 1. Payment data
class Payment {
    constructor(customerId, amount) {
        this.customerId = customerId;
        this.amount = amount;
        this.status = "pending";
    }

    setStatus(status) {
        this.status = status;
    }
}

// 2. Card validator
class CardValidator {
    validateCardNumber(cardNumber) {
        return cardNumber.length === 16;
    }

    validateCVV(cvv) {
        return cvv.length === 3;
    }
}

// 3. Payment processor
class PaymentProcessor {
    constructor(cardValidator) {
        this.validator = cardValidator;
    }

    processPayment(payment, cardNumber, cvv) {
        if (!this.validator.validateCardNumber(cardNumber)) {
            console.log("Invalid card");
            return false;
        }
        if (!this.validator.validateCVV(cvv)) {
            console.log("Invalid CVV");
            return false;
        }
        
        console.log("Processing payment...");
        payment.setStatus("completed");
        return true;
    }
}

// 4. Fee calculator
class PaymentFeeCalculator {
    calculateProcessingFee(payment) {
        return payment.amount * 0.02; // 2% fee
    }
}

// 5. Refund handler
class RefundHandler {
    applyRefund(payment) {
        console.log(`Refunding ${payment.amount}`);
        payment.setStatus("refunded");
    }
}

// 6. Email service
class PaymentEmailService {
    sendReceiptEmail(payment, email) {
        console.log(`Sending receipt to ${email}`);
    }
}

// 7. SMS service
class PaymentSMSService {
    sendSMSConfirmation(payment, phone) {
        console.log(`SMS to ${phone}: Payment successful`);
    }
}

// 8. Transaction logger
class TransactionLogger {
    logTransaction(payment) {
        console.log(`Logging transaction for customer ${payment.customerId}`);
    }
}

// 9. Payment repository
class PaymentRepository {
    saveToDatabase(payment) {
        console.log("Saving payment record...");
    }
}

// 10. Fraud detector
class FraudDetector {
    checkForFraud(payment) {
        console.log("Checking for fraud...");
        return false; // No fraud detected
    }
}

// 11. Invoice generator
class InvoiceGenerator {
    generateInvoicePDF(payment) {
        console.log("Creating PDF invoice...");
    }
}
```

---

## Solution 10: Critical Thinking

**Analysis:**

**Design A (Single Calculator class with all operations):**
- ✅ **GOOD - Follows SRP**
- Single responsibility: Performing mathematical calculations
- All methods serve the same purpose
- Would only change if math operation rules change

**Design B (One class per operation):**
- ❌ **BAD - Over-applying SRP**
- Too granular - each operation is too small to justify a class
- Creates unnecessary complexity
- Hard to use and maintain

**Design C (Grouped by complexity):**
- ✅ **ALSO GOOD - Reasonable separation**
- Basic operations vs advanced operations
- Makes sense if different teams maintain them
- Or if advanced operations have external dependencies

**Conclusion:**
- **Best for most cases**: Design A
- **When to use C**: Large codebase, different maintainers, or clear separation of concerns
- **Never use B**: Over-engineering leads to maintenance nightmare

**Key Lesson**: SRP is about **cohesion**, not about minimizing methods per class!

---

## Bonus Challenge Solution

```javascript
// 1. Shopping cart (core data & management)
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    addItem(item) { }
    removeItem(itemId) { }
    getItems() { }
    calculateSubtotal() { }
}

// 2. Pricing engine
class PricingEngine {
    calculateTotal(cart) { }
    applyTax(amount) { }
}

// 3. Coupon manager
class CouponManager {
    validateCoupon(code) { }
    applyCoupon(cart, code) { }
}

// 4. Shipping calculator
class ShippingCalculator {
    calculateShipping(cart, address) { }
}

// 5. Email service
class OrderEmailService {
    sendTrackingEmail(order) { }
    sendReceiptEmail(order) { }
}

// 6. PDF generator
class ReceiptPDFGenerator {
    generatePDF(order) { }
}

// 7. Return handler
class ReturnHandler {
    processReturn(order) { }
    calculateRefund(order) { }
}

// 8. Purchase history manager
class PurchaseHistoryManager {
    savePurchase(order) { }
    getPurchaseHistory(customerId) { }
}

// 9. Order repository
class OrderRepository {
    saveOrder(order) { }
    loadOrder(orderId) { }
}
```

**Total: 9 classes, each with clear, single responsibility!**

---

## Key Takeaways

1. **SRP ≠ One method per class**
2. **Ask**: "Why would this change?" not "How many methods?"
3. **Group**: Related methods serving same responsibility
4. **Separate**: Different domains (UI, DB, logic, notifications)
5. **Balance**: Don't over-engineer, but don't under-separate
6. **Practice**: The more you do it, the more natural it becomes

Happy coding! 🎉

