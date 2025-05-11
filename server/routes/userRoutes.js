const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createNewUser);

router.route('/:id')
    .get(userControllers.getUserById);

router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
            
        // Поиск пользователя
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
        // Проверка пароля
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });
    
        // Генерация токена
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token });
            
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

