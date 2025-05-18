require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/content', contentRoutes);

app.get('/content/image/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Content.findById(productId); // Ensure this method fetches the product correctly

    if (product && product.image) {
        res.set('Content-Type', 'image/jpeg'); // Set appropriate content type
        res.send(product.image); // Send the binary image data
    } else {
        res.status(404).send('Image not found');
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

start();