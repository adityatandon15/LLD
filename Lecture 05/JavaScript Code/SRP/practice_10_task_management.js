// Practice 10: Task Management System
// This code violates SRP - TaskManager class has multiple responsibilities

class TaskManager {
    constructor(userId, userName) {
        this.userId = userId;
        this.userName = userName;
        this.tasks = [];
        this.teams = [];
        this.notifications = [];
    }

    // Responsibility 1: Task CRUD operations (should be separate)
    createTask(title, description, priority, dueDate) {
        const task = {
            id: `TASK${Date.now()}`,
            title,
            description,
            priority,
            dueDate,
            status: 'todo',
            createdAt: new Date(),
            assignedTo: null
        };
        this.tasks.push(task);
        console.log(`Task created: ${title} (Priority: ${priority})`);
        return task;
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            console.log(`Task ${taskId} updated to: ${newStatus}`);
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        console.log(`Task ${taskId} deleted`);
    }

    // Responsibility 2: Task assignment (should be separate)
    assignTask(taskId, assigneeName) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.assignedTo = assigneeName;
            console.log(`Task ${taskId} assigned to ${assigneeName}`);
        }
    }

    reassignTask(taskId, newAssignee) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            console.log(`Reassigning task from ${task.assignedTo} to ${newAssignee}`);
            task.assignedTo = newAssignee;
        }
    }

    // Responsibility 3: Team management (should be separate)
    createTeam(teamName, members) {
        const team = { name: teamName, members, tasks: [] };
        this.teams.push(team);
        console.log(`Team "${teamName}" created with ${members.length} members`);
    }

    addMemberToTeam(teamName, memberName) {
        const team = this.teams.find(t => t.name === teamName);
        if (team) {
            team.members.push(memberName);
            console.log(`${memberName} added to team ${teamName}`);
        }
    }

    // Responsibility 4: Notification system (should be separate)
    sendTaskReminder(email, task) {
        console.log(`\nSending reminder to ${email}`);
        console.log(`Task: ${task.title}`);
        console.log(`Due: ${task.dueDate}`);
        console.log(`Priority: ${task.priority}`);
    }

    sendDeadlineAlert(task) {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysLeft <= 2) {
            console.log(`\n⚠️  ALERT: Task "${task.title}" due in ${daysLeft} days!`);
        }
    }

    // Responsibility 5: Analytics and reporting (should be separate)
    calculateProductivity() {
        const completed = this.tasks.filter(t => t.status === 'completed').length;
        const total = this.tasks.length;
        const productivity = (completed / total) * 100;
        
        console.log(`\n=== Productivity Report ===`);
        console.log(`Total Tasks: ${total}`);
        console.log(`Completed: ${completed}`);
        console.log(`Productivity: ${productivity.toFixed(2)}%`);
        return productivity;
    }

    generateWeeklyReport() {
        console.log(`\n=== Weekly Report for ${this.userName} ===`);
        
        const byStatus = {};
        for (const task of this.tasks) {
            byStatus[task.status] = (byStatus[task.status] || 0) + 1;
        }
        
        console.log(`Tasks by Status:`);
        for (const [status, count] of Object.entries(byStatus)) {
            console.log(`  ${status}: ${count}`);
        }
        
        const byPriority = {};
        for (const task of this.tasks) {
            byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
        }
        
        console.log(`\nTasks by Priority:`);
        for (const [priority, count] of Object.entries(byPriority)) {
            console.log(`  ${priority}: ${count}`);
        }
    }

    // Responsibility 6: Export and import (should be separate)
    exportToJSON() {
        const data = {
            userId: this.userId,
            userName: this.userName,
            tasks: this.tasks,
            teams: this.teams
        };
        console.log(`\nExporting data to JSON...`);
        console.log(JSON.stringify(data, null, 2));
    }

    // Responsibility 7: Database operations (should be separate)
    syncWithDatabase() {
        console.log(`\nSyncing ${this.tasks.length} tasks with database...`);
        console.log(`User: ${this.userName}`);
        console.log(`Sync completed successfully!`);
    }
}

// Main execution
function main() {
    const manager = new TaskManager("U001", "Neha Kapoor");
    
    const task1 = manager.createTask(
        "Implement authentication",
        "Add JWT-based authentication",
        "high",
        "2025-10-13"
    );
    
    const task2 = manager.createTask(
        "Write unit tests",
        "Add tests for user module",
        "medium",
        "2025-10-15"
    );
    
    const task3 = manager.createTask(
        "Update documentation",
        "Update API documentation",
        "low",
        "2025-10-20"
    );
    
    manager.assignTask(task1.id, "Rahul");
    manager.assignTask(task2.id, "Priya");
    
    manager.updateTaskStatus(task1.id, "in-progress");
    manager.updateTaskStatus(task3.id, "completed");
    
    manager.createTeam("Backend Team", ["Rahul", "Priya", "Amit"]);
    manager.addMemberToTeam("Backend Team", "Sneha");
    
    manager.sendTaskReminder("rahul@example.com", task1);
    manager.sendDeadlineAlert(task1);
    
    manager.calculateProductivity();
    manager.generateWeeklyReport();
    
    manager.exportToJSON();
    manager.syncWithDatabase();
}

main();


