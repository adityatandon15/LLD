// Practice 01: User Management System
// This code violates SRP - User class has too many responsibilities

class UserDataManagement {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        
    }

    // Responsibility 1: User data management
    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    // Responsibility 2: Password validation (should be separate)
    

    // Responsibility 3: Email sending (should be separate)
  



}

// second responsiblity

class validationCredential{

    constructor(password){
        return this.password
    }

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

//next responiblity

class successfulLogin{

    sendWelcomeEmail() {
        console.log(`Sending welcome email to ${this.email}`);
        console.log(`Subject: Welcome ${this.username}!`);
        console.log(`Body: Thank you for joining our platform.`);
    }
}



class UpdateDB{


    // Responsibility 4: Database operations (should be separate)
    saveToDatabase(username) {
      console.log(`Saving user ${this.username} to database...`);
      console.log(`User data saved successfully!`);
  }
}


class LoggerManagement{

     // Responsibility 5: Logging (should be separate)
     logUserActivity(action) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] User ${this.username} performed: ${action}`);
  }
}





// Main execution
function main(user,email,password) {
    const User1 = new UserManagement(user,email);

    const validatePassword =new validationCredential(password)

    const loginCheck = new successfulLogin(user,email)


    const databaseUpdate= new UpdateDB()


    const initLoger = new LoggerManagement()



    
  

}

main("shafik","shai@gmail.com","passowrd");


