// Practice 01: User Management System - CORRECTED SOLUTION
// This code follows SRP - Each class has a single responsibility

// Responsibility 1: User data management
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = true;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }
}

// Responsibility 2: Password validation
class PasswordValidator {
    validatePassword(password) {
        if (password.length < 8) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[0-9]/.test(password)) {
            return false;
        }
        return true;
    }
}

// Responsibility 3: Email sending
class EmailService {
    sendWelcomeEmail(user) {
        console.log(`Sending welcome email to ${user.getEmail()}`);
        console.log(`Subject: Welcome ${user.getUsername()}!`);
        console.log(`Body: Thank you for joining our platform.`);
    }
}

// Responsibility 4: Database operations
class UserRepository {
    saveToDatabase(user) {
        console.log(`Saving user ${user.getUsername()} to database...`);
        console.log(`User data saved successfully!`);
    }
}

// Responsibility 5: Logging
class Logger {
    logUserActivity(username, action) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] User ${username} performed: ${action}`);
    }
}

// Main execution
function main() {
    // Create user
    const user = new User("shafik", "shai@gmail.com", "SecurePass123");
    
    // Create service instances
    const passwordValidator = new PasswordValidator();
    const emailService = new EmailService();
    const userRepository = new UserRepository();
    const logger = new Logger();
    
    // Validate password before proceeding
    if (passwordValidator.validatePassword(user.getPassword())) {
        userRepository.saveToDatabase(user);
        emailService.sendWelcomeEmail(user);
        logger.logUserActivity(user.getUsername(), "Account created");
    } else {
        console.log("Password validation failed!");
    }
}

main();

