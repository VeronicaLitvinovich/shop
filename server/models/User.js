const db = require('../config/db');

class User {
    constructor(
        email, 
        name = null, 
        surname = null, 
        phone_number = null, 
        password, 
        role = 'user'
    ) {
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

    static findByEmail(email) {
    const sql = "SELECT * FROM users WHERE BINARY email = ?"; // Учитываем регистр
    return db.execute(sql, [email])
        .then(([rows]) => {
            console.log('DB Response:', rows); // Добавляем лог
            return rows.length > 0 ? rows[0] : null;
        });
    }

    static async updateByEmail(email, updateData) {
    try {
        // Предполагаем, что у вас есть доступ к базе данных
        const [result] = await db.query(
            `UPDATE users SET name = ?, surname = ?, phone_number = ? WHERE email = ?`,
            [updateData.name, updateData.surname, updateData.phone_number, email]
        );

        // Проверяем, обновлены ли строки
        if (result.affectedRows === 0) {
            return null; // Пользователь не найден
        }

        // Возвращаем обновленного пользователя (можно сделать отдельный запрос, если нужно вернуть все данные)
        const [updatedUser] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return updatedUser[0];
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Пробрасываем ошибку дальше
    }
}
}

module.exports = User;