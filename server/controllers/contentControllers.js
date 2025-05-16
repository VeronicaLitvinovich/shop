const Content = require('../models/Content');

exports.getAllProducts = async (req, res, next) => {
    try {
        const [products, _] = await Content.findAll();

        res.status(200).json({count: products.length, products});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewProduct = async (req, res, next) => {
    try {
        const { name, description, category, color, image, quantity } = req.body;

        // Замена undefined на null для необязательных полей
        const user = new Content(
            name,
            description,
            category,
            color,
            image, 
            quantity
        );

        await product.save();

        res.status(201).json({ success: true, message: "Product created successfully" });
    } catch (error) {
        console.error("Creating error:", error);
        res.status(500).json({ 
            error: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};