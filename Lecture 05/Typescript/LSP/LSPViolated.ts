// Account interface
interface Account {
    deposit(amount: number): void
    withdraw(amount: number): void
}

class SavingAccount implements Account {
    private balance: number = 0

    deposit(amount: number): void {
        this.balance += amount
        console.log(`Deposited: ${amount} in Savings Account. New Balance: ${this.balance}`)
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount
            console.log(`Withdrawn: ${amount} from Savings Account. New Balance: ${this.balance}`)
        } else {
            console.log("Insufficient funds in Savings Account!")
        }
    }
}

class CurrentAccount implements Account {
    private balance: number = 0

    deposit(amount: number): void {
        this.balance += amount
        console.log(`Deposited: ${amount} in Current Account. New Balance: ${this.balance}`)
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount
            console.log(`Withdrawn: ${amount} from Current Account. New Balance: ${this.balance}`)
        } else {
            console.log("Insufficient funds in Current Account!")
        }
    }
}

class FixedTermAccount implements Account {
    private balance: number = 0

    deposit(amount: number): void {
        this.balance += amount
        console.log(`Deposited: ${amount} in Fixed Term Account. New Balance: ${this.balance}`)
    }

    withdraw(amount: number): void {
        throw new Error("Withdrawal not allowed in Fixed Term Account!")
    }
}

class BankClient {
    private accounts: Account[]

    constructor(accounts: Account[]) {
        this.accounts = accounts
    }

    processTransactions(): void {
        for (const acc of this.accounts) {
            acc.deposit(1000)

            // LSP violation: assuming all accounts support withdrawal
            try {
                acc.withdraw(500)
            } catch (e: any) {
                console.log(`Exception: ${e.message}`)
            }
        }
    }
}

// Equivalent of Java main
function main(): void {
    const accounts: Account[] = []
    accounts.push(new SavingAccount())
    accounts.push(new CurrentAccount())
    accounts.push(new FixedTermAccount())

    const client = new BankClient(accounts)
    client.processTransactions()
}

main()

/**
 * If a .ts file has no imports or exports, TypeScript treats it as a global script.
 * Adding `export {}` marks the file as a module and prevents
 * "Duplicate identifier 'SavingAccount'" errors.
 */
export {}