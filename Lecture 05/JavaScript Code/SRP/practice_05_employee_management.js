// Practice 05: Employee Management System
// This code violates SRP - Employee class has too many responsibilities

class Employee {
    constructor(id, name, position, salary, email) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.email = email;
        this.attendanceRecords = [];
        this.performanceScore = 0;
    }

    // Responsibility 1: Employee data management
    getName() {
        return this.name;
    }

    getPosition() {
        return this.position;
    }

    // Responsibility 2: Payroll calculation (should be separate)
    calculateMonthlySalary() {
        return this.salary;
    }

    calculateAnnualSalary() {
        return this.salary * 12;
    }

    calculateBonus(performanceMultiplier) {
        const bonus = this.salary * performanceMultiplier;
        console.log(`Bonus for ${this.name}: Rs ${bonus}`);
        return bonus;
    }

    // Responsibility 3: Attendance tracking (should be separate)
    markAttendance(date, status) {
        this.attendanceRecords.push({ date, status });
        console.log(`Attendance marked for ${this.name} on ${date}: ${status}`);
    }

    calculateAttendancePercentage() {
        const presentDays = this.attendanceRecords.filter(r => r.status === 'present').length;
        const percentage = (presentDays / this.attendanceRecords.length) * 100;
        console.log(`Attendance: ${percentage.toFixed(2)}%`);
        return percentage;
    }

    // Responsibility 4: Performance evaluation (should be separate)
    evaluatePerformance(score) {
        this.performanceScore = score;
        console.log(`Performance score for ${this.name}: ${score}/100`);
        
        if (score >= 90) {
            console.log(`Rating: Excellent`);
        } else if (score >= 75) {
            console.log(`Rating: Good`);
        } else {
            console.log(`Rating: Needs Improvement`);
        }
    }

    // Responsibility 5: Email notifications (should be separate)
    sendPayslip(month) {
        console.log(`Sending payslip email to ${this.email}`);
        console.log(`Month: ${month}`);
        console.log(`Salary: Rs ${this.calculateMonthlySalary()}`);
        console.log(`Employee: ${this.name}`);
    }

    // Responsibility 6: Report generation (should be separate)
    generateEmployeeReport() {
        console.log(`\n=== Employee Report ===`);
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Position: ${this.position}`);
        console.log(`Annual Salary: Rs ${this.calculateAnnualSalary()}`);
        console.log(`Performance: ${this.performanceScore}/100`);
    }
}

// Main execution
function main() {
    const emp = new Employee("E001", "Rahul Sharma", "Software Engineer", 80000, "rahul@company.com");
    
    emp.markAttendance("2025-10-01", "present");
    emp.markAttendance("2025-10-02", "present");
    emp.markAttendance("2025-10-03", "absent");
    
    emp.calculateAttendancePercentage();
    emp.evaluatePerformance(85);
    emp.calculateBonus(0.15);
    emp.sendPayslip("October 2025");
    emp.generateEmployeeReport();
}

main();


