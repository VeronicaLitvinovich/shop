const User = require('../models/User');

exports.createNewUser = async (req, res, next) => {
    try {
        const { email, name, surname, phone_number, password } = req.body;
        
        // Валидация обязательных полей
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const user = new User(email, name, surname, phone_number, password);
        await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {
        console.error("Registration error:", error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: "Email already exists"
            });
        }
        
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

exports.getUserById = async (req, res, next) => {
    try {
        let userId = req.params.id;

        let [user, _] = await User.findById(userId);

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        next(error);
    }
};