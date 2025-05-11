const db = require('../config/db');

class User {
    constructor(email, name, surname, phone_number, password, role = 'user') {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phone_number = phone_number;
        this.password = password;
        this.role = role;
    }

    async save() {
        const sql = `
            INSERT INTO users(
                email, 
                name, 
                surname, 
                phone_number, 
                password, 
                role
            ) VALUES(?, ?, ?, ?, ?, ?)`;
        
        return db.execute(sql, [
            this.email,
            this.name,
            this.surname,
            this.phone_number,
            this.password,
            this.role
        ]);
    }

    static findAll() {
        const sql = "SELECT * FROM users";
        return db.execute(sql);
    }

    static findById(id) {
        const sql = "SELECT * FROM users WHERE id = ?";
        return db.execute(sql, [id]);
    }
}

module.exports = User;