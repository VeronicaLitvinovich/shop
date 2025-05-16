const db = require('../config/db');

class Content {
    constructor(
        name, 
        description, 
        category, 
        color, 
        image,
        quantity
    ) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.color = color;
        this.image = image;
        this.quantity = quantity;
    }

    async save() {
        const sql = `
            INSERT INTO users(
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
            this.image,
            this.quantity
        ]);
    }

    static findAll() {
        const sql = "SELECT * FROM products";
        return db.execute(sql);
    }
}

module.exports = Content;