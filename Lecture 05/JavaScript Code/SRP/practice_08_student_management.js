// Practice 08: Student Management System
// This code violates SRP - Student class has multiple responsibilities

class Student {
    constructor(id, name, email, course) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
        this.grades = {};
        this.attendance = [];
        this.fees = { total: 50000, paid: 0 };
    }

    // Responsibility 1: Student data management
    getName() {
        return this.name;
    }

    getCourse() {
        return this.course;
    }

    // Responsibility 2: Grade management (should be separate)
    addGrade(subject, marks) {
        this.grades[subject] = marks;
        console.log(`Grade added for ${this.name}: ${subject} - ${marks}/100`);
    }

    calculateGPA() {
        const subjects = Object.keys(this.grades);
        if (subjects.length === 0) return 0;
        
        let total = 0;
        for (const subject of subjects) {
            total += this.grades[subject];
        }
        const average = total / subjects.length;
        const gpa = (average / 100) * 10; // Convert to 10-point scale
        
        console.log(`GPA for ${this.name}: ${gpa.toFixed(2)}/10`);
        return gpa;
    }

    generateGradeCard() {
        console.log(`\n=== Grade Card ===`);
        console.log(`Student: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Course: ${this.course}`);
        console.log(`\nGrades:`);
        for (const [subject, marks] of Object.entries(this.grades)) {
            console.log(`  ${subject}: ${marks}/100`);
        }
        console.log(`\nGPA: ${this.calculateGPA().toFixed(2)}/10`);
    }

    // Responsibility 3: Attendance tracking (should be separate)
    markAttendance(date, status) {
        this.attendance.push({ date, status });
        console.log(`Attendance marked for ${this.name} on ${date}: ${status}`);
    }

    calculateAttendancePercentage() {
        const present = this.attendance.filter(a => a.status === 'present').length;
        const percentage = (present / this.attendance.length) * 100;
        console.log(`Attendance: ${percentage.toFixed(2)}%`);
        return percentage;
    }

    // Responsibility 4: Fee management (should be separate)
    payFees(amount) {
        this.fees.paid += amount;
        const remaining = this.fees.total - this.fees.paid;
        console.log(`Payment of Rs ${amount} received from ${this.name}`);
        console.log(`Remaining balance: Rs ${remaining}`);
    }

    generateFeeReceipt(amount) {
        console.log(`\n=== Fee Receipt ===`);
        console.log(`Student: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Amount Paid: Rs ${amount}`);
        console.log(`Total Paid: Rs ${this.fees.paid}`);
        console.log(`Total Fees: Rs ${this.fees.total}`);
        console.log(`Balance: Rs ${this.fees.total - this.fees.paid}`);
    }

    // Responsibility 5: Email notifications (should be separate)
    sendProgressReport() {
        console.log(`\nSending progress report to ${this.email}`);
        console.log(`Subject: Academic Progress Report`);
        console.log(`Dear ${this.name},`);
        console.log(`Your current GPA is: ${this.calculateGPA().toFixed(2)}/10`);
        console.log(`Your attendance is: ${this.calculateAttendancePercentage().toFixed(2)}%`);
    }

    sendFeeReminder() {
        const balance = this.fees.total - this.fees.paid;
        if (balance > 0) {
            console.log(`\nSending fee reminder to ${this.email}`);
            console.log(`Dear ${this.name},`);
            console.log(`You have a pending fee balance of Rs ${balance}`);
            console.log(`Please pay at your earliest convenience.`);
        }
    }

    // Responsibility 6: Database operations (should be separate)
    saveToDatabase() {
        console.log(`\nSaving student ${this.id} to database...`);
        console.log(`Name: ${this.name}`);
        console.log(`Course: ${this.course}`);
        console.log(`Data saved successfully!`);
    }
}

// Main execution
function main() {
    const student = new Student("ST001", "Ananya Singh", "ananya@student.edu", "Computer Science");
    
    student.addGrade("Data Structures", 85);
    student.addGrade("Algorithms", 90);
    student.addGrade("Database Systems", 88);
    
    student.markAttendance("2025-10-01", "present");
    student.markAttendance("2025-10-02", "present");
    student.markAttendance("2025-10-03", "absent");
    student.markAttendance("2025-10-04", "present");
    
    student.calculateGPA();
    student.calculateAttendancePercentage();
    
    student.payFees(25000);
    student.generateFeeReceipt(25000);
    
    student.generateGradeCard();
    student.sendProgressReport();
    student.sendFeeReminder();
    
    student.saveToDatabase();
}

main();


