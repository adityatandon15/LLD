// Practice 09: Banking System
// This code violates SRP - BankAccount class has multiple responsibilities

class BankAccount {
    constructor(accountNumber, accountHolderName, initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = initialBalance;
        this.transactions = [];
        this.loanAmount = 0;
    }

    // Responsibility 1: Account data management
    getAccountNumber() {
        return this.accountNumber;
    }

    getBalance() {
        return this.balance;
    }

    // Responsibility 2: Transaction management (should be separate)
    deposit(amount) {
        this.balance += amount;
        this.transactions.push({
            type: 'deposit',
            amount,
            timestamp: new Date(),
            balance: this.balance
        });
        console.log(`Deposited Rs ${amount}. New balance: Rs ${this.balance}`);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log(`Insufficient balance. Available: Rs ${this.balance}`);
            return false;
        }
        this.balance -= amount;
        this.transactions.push({
            type: 'withdrawal',
            amount,
            timestamp: new Date(),
            balance: this.balance
        });
        console.log(`Withdrawn Rs ${amount}. New balance: Rs ${this.balance}`);
        return true;
    }

    transfer(toAccount, amount) {
        if (this.withdraw(amount)) {
            console.log(`Transferred Rs ${amount} to account ${toAccount}`);
            return true;
        }
        return false;
    }

    // Responsibility 3: Interest calculation (should be separate)
    calculateInterest(rate, months) {
        const interest = (this.balance * rate * months) / (100 * 12);
        console.log(`Interest calculated: Rs ${interest.toFixed(2)}`);
        return interest;
    }

    applyInterest(rate, months) {
        const interest = this.calculateInterest(rate, months);
        this.balance += interest;
        console.log(`Interest applied. New balance: Rs ${this.balance.toFixed(2)}`);
    }

    // Responsibility 4: Loan management (should be separate)
    applyForLoan(amount, interestRate, tenure) {
        console.log(`Processing loan application for Rs ${amount}`);
        const monthlyPayment = (amount * interestRate * tenure) / (100 * 12);
        this.loanAmount = amount;
        console.log(`Loan approved! Monthly payment: Rs ${monthlyPayment.toFixed(2)}`);
    }

    payLoanEMI(amount) {
        if (amount > this.balance) {
            console.log(`Insufficient balance for EMI payment`);
            return false;
        }
        this.balance -= amount;
        this.loanAmount -= amount;
        console.log(`EMI paid: Rs ${amount}. Remaining loan: Rs ${this.loanAmount}`);
        return true;
    }

    // Responsibility 5: Report generation (should be separate)
    generateStatement(months) {
        console.log(`\n=== Account Statement ===`);
        console.log(`Account Number: ${this.accountNumber}`);
        console.log(`Account Holder: ${this.accountHolderName}`);
        console.log(`Current Balance: Rs ${this.balance}`);
        console.log(`\nRecent Transactions:`);
        
        const recentTransactions = this.transactions.slice(-months);
        for (const txn of recentTransactions) {
            console.log(`${txn.timestamp.toLocaleDateString()} - ${txn.type}: Rs ${txn.amount}`);
        }
    }

    generateTaxReport() {
        console.log(`\n=== Tax Report ===`);
        console.log(`Account Holder: ${this.accountHolderName}`);
        
        const deposits = this.transactions
            .filter(t => t.type === 'deposit')
            .reduce((sum, t) => sum + t.amount, 0);
        
        console.log(`Total Deposits: Rs ${deposits}`);
        console.log(`Interest Income: Rs ${(deposits * 0.05).toFixed(2)}`);
    }

    // Responsibility 6: Notification system (should be separate)
    sendLowBalanceAlert(email) {
        if (this.balance < 1000) {
            console.log(`\nSending low balance alert to ${email}`);
            console.log(`Your account balance is Rs ${this.balance}`);
            console.log(`Please maintain minimum balance.`);
        }
    }

    sendTransactionAlert(email, transaction) {
        console.log(`\nSending transaction alert to ${email}`);
        console.log(`Transaction: ${transaction.type}`);
        console.log(`Amount: Rs ${transaction.amount}`);
        console.log(`Balance: Rs ${this.balance}`);
    }

    // Responsibility 7: Database operations (should be separate)
    saveToDatabase() {
        console.log(`\nSaving account ${this.accountNumber} to database...`);
        console.log(`Balance: Rs ${this.balance}`);
        console.log(`Transactions: ${this.transactions.length}`);
    }
}

// Main execution
function main() {
    const account = new BankAccount("ACC123456789", "Vikram Malhotra", 50000);
    
    account.deposit(10000);
    account.withdraw(5000);
    account.transfer("ACC987654321", 2000);
    
    account.applyInterest(7, 6);
    
    account.applyForLoan(100000, 10, 24);
    account.payLoanEMI(5000);
    
    account.generateStatement(5);
    account.generateTaxReport();
    
    account.sendLowBalanceAlert("vikram@example.com");
    account.sendTransactionAlert("vikram@example.com", {
        type: 'withdrawal',
        amount: 5000
    });
    
    account.saveToDatabase();
}

main();


