const db = require('../config/db');

class Content {
    constructor(name, description, category, color, image, quantity) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.color = color;
        this.image = image; // This should be a binary buffer
        this.quantity = quantity;
    }

    async save() {
        const sql = `
            INSERT INTO products(
                name, 
                description, 
                category, 
                color, 
                image,
                quantity
            ) VALUES(?, ?, ?, ?, ?, ?)`;
        
        return db.execute(sql, [
            this.name,
            this.description,
            this.category,
            this.color,
            this.image, // Binary data
            this.quantity
        ]);
    }

    static findAll() {
        const sql = "SELECT * FROM products";
        return db.execute(sql);
    }

    static async findById(id) {
        const sql = "SELECT * FROM products WHERE id = ?";
        const [rows] = await db.execute(sql, [id]);
        return rows[0]; // Return the first matching row
    }

    static async deleteById(id) {
    const sql = "DELETE FROM products WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result; // Return the result for checking affected rows
    }
}

module.exports = Content;