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
        const { name, description, category, color, quantity } = req.body;
        const image = req.file ? req.file.buffer : null; // Получаем бинарные данные изображения

        const product = new Content(
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

exports.getImage = async (req, res) => {
    const productId = req.params.id;
    const product = await Content.findById(productId); // Ensure this method fetches the product correctly

    if (product && product.image) {
        res.set('Content-Type', 'image/jpeg'); // Set appropriate content type
        res.send(product.image); // Send the binary image data
    } else {
        res.status(404).send('Image not found');
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await Content.deleteById(productId); // Ensure this method is defined in your Content model

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(204).send(); // Successfully deleted
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};