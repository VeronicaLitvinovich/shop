const User = require('../models/User');

// В контроллере userControllers.js:
exports.createNewUser = async (req, res, next) => {
    try {
        const { email, name, surname, phone_number, password } = req.body;
        
        // Проверка обязательных полей
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Замена undefined на null для необязательных полей
        const user = new User(
            email,
            name || null,
            surname || null,
            phone_number || null,
            password
        );

        await user.save();

        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        // Обработка ошибки дублирования email
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Registration error:", error);
        res.status(500).json({ 
            error: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const [users, _] = await User.findAll();

        res.status(200).json({count: users.length, users});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getUserByEmail = async (req, res, next) => {
    try {
        console.log('Request params:', req.params); // Лог параметров
        const userEmail = req.params.email;
        console.log('Searching for:', userEmail); // Лог искомого email
        
        const user = await User.findByEmail(userEmail);
        console.log('Found user:', user); // Лог результата поиска
        
        if (!user) {
            console.log('User not found in DB'); // Лог отсутствия пользователя
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        next(error);
    }
};

exports.updateUserProfile = async (req, res) => {
    const { email } = req.params;
    const { name, surname, phone_number } = req.body;

    try {
        // Логика для обновления пользователя в базе данных
        const updatedUser = await User.updateByEmail(email, { name, surname, phone_number });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};