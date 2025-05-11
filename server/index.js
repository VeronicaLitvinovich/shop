require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5001;
const app = express();

// Порядок middleware важен!
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Подключение роутов
app.use('/users', userRoutes);

// Обработчик ошибок должен быть последним
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