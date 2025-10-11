# SRP Practice Guide

This guide contains 10 practice exercises to help you master the Single Responsibility Principle (SRP). Each file contains code that violates SRP, and your task is to refactor them.

## How to Practice

1. Read the violated code in each practice file
2. Identify all the responsibilities in the class
3. Create separate classes for each responsibility
4. Refactor the code to follow SRP
5. Test your solution by running the code

## Practice Files Overview

### ✅ Practice 01: User Management System
**File:** `practice_01_user_management.js`

**Current Violations:**
- User class handles: user data, password validation, email sending, database operations, and logging
- **Goal:** Separate into User, PasswordValidator, EmailService, UserRepository, and Logger classes

---

### ✅ Practice 02: Library Management System
**File:** `practice_02_library_management.js`

**Current Violations:**
- Book class handles: book data, inventory management, notifications, reports, and database operations
- **Goal:** Separate into Book, InventoryManager, NotificationService, ReportGenerator, and BookRepository classes

---

### ✅ Practice 03: Order Processing System
**File:** `practice_03_order_processing.js`

**Current Violations:**
- Order class handles: order data, price calculation, payment processing, shipping, email notifications, and database operations
- **Goal:** Separate into Order, PriceCalculator, PaymentProcessor, ShippingService, EmailNotifier, and OrderRepository classes

---

### ✅ Practice 04: Blog System
**File:** `practice_04_blog_system.js`

**Current Violations:**
- BlogPost class handles: post data, comment management, analytics, content formatting, SEO, and database operations
- **Goal:** Separate into BlogPost, CommentManager, AnalyticsTracker, HTMLRenderer, SEOGenerator, and PostRepository classes

---

### ✅ Practice 05: Employee Management System
**File:** `practice_05_employee_management.js`

**Current Violations:**
- Employee class handles: employee data, payroll calculation, attendance tracking, performance evaluation, email notifications, and report generation
- **Goal:** Separate into Employee, PayrollCalculator, AttendanceTracker, PerformanceEvaluator, EmailService, and ReportGenerator classes

---

### ✅ Practice 06: Restaurant Management System
**File:** `practice_06_restaurant_management.js`

**Current Violations:**
- Restaurant class handles: menu management, order processing, billing, reservation management, notifications, and analytics
- **Goal:** Separate into Restaurant, MenuManager, OrderProcessor, BillingService, ReservationManager, NotificationService, and AnalyticsService classes

---

### ✅ Practice 07: Hotel Booking System
**File:** `practice_07_hotel_booking.js`

**Current Violations:**
- Hotel class handles: room management, booking management, payment calculation, guest management, email notifications, and report generation
- **Goal:** Separate into Hotel, RoomManager, BookingManager, PaymentCalculator, GuestManager, EmailService, and ReportGenerator classes

---

### ✅ Practice 08: Student Management System
**File:** `practice_08_student_management.js`

**Current Violations:**
- Student class handles: student data, grade management, attendance tracking, fee management, email notifications, and database operations
- **Goal:** Separate into Student, GradeManager, AttendanceTracker, FeeManager, EmailService, and StudentRepository classes

---

### ✅ Practice 09: Banking System
**File:** `practice_09_banking_system.js`

**Current Violations:**
- BankAccount class handles: account data, transaction management, interest calculation, loan management, report generation, notification system, and database operations
- **Goal:** Separate into BankAccount, TransactionManager, InterestCalculator, LoanManager, ReportGenerator, NotificationService, and AccountRepository classes

---

### ✅ Practice 10: Task Management System
**File:** `practice_10_task_management.js`

**Current Violations:**
- TaskManager class handles: task CRUD operations, task assignment, team management, notification system, analytics/reporting, export/import, and database operations
- **Goal:** Separate into TaskManager, AssignmentService, TeamManager, NotificationService, AnalyticsService, DataExporter, and TaskRepository classes

---

## Refactoring Steps

For each practice file:

1. **Identify Responsibilities**
   - List all the different things the class is doing
   - Group related methods together

2. **Create New Classes**
   - Create a separate class for each responsibility
   - Name classes clearly based on their single responsibility

3. **Move Methods**
   - Move methods to their appropriate classes
   - Update method signatures if needed

4. **Update Dependencies**
   - Use composition to connect classes
   - Pass necessary dependencies through constructors or method parameters

5. **Refactor Main Function**
   - Update the main() function to use the new class structure
   - Ensure the output remains the same

6. **Test**
   - Run the refactored code
   - Verify it produces the same output as the original

## Example Pattern

If you see a class like this:
```javascript
class User {
    validatePassword() { }  // Password validation responsibility
    sendEmail() { }          // Email sending responsibility
    saveToDatabase() { }     // Data persistence responsibility
}
```

Refactor to:
```javascript
class User {
    // Only user data
}

class PasswordValidator {
    validate(password) { }
}

class EmailService {
    send(to, subject, body) { }
}

class UserRepository {
    save(user) { }
}
```

## Tips

- ✅ Each class should have only ONE reason to change
- ✅ Class names should clearly indicate their responsibility
- ✅ Methods should be cohesive within each class
- ✅ Use composition to connect classes
- ✅ Keep the original functionality intact

## Progress Tracker

Mark your progress as you complete each practice:

- [ ] Practice 01: User Management System
- [ ] Practice 02: Library Management System
- [ ] Practice 03: Order Processing System
- [ ] Practice 04: Blog System
- [ ] Practice 05: Employee Management System
- [ ] Practice 06: Restaurant Management System
- [ ] Practice 07: Hotel Booking System
- [ ] Practice 08: Student Management System
- [ ] Practice 09: Banking System
- [ ] Practice 10: Task Management System

---

**Happy Practicing! 🚀**

Remember: The goal is not just to make the code work, but to make it maintainable, testable, and following the Single Responsibility Principle!


