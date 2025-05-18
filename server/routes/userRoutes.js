const User = require('../models/User');
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createNewUser);

// В userRoutes.js убедитесь что роут объявлен как:
router.route('/profile/:email')
    .get(userControllers.getUserByEmail)
    .put(userControllers.updateUserProfile)


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Получаем пользователя
        const user = await User.findByEmail(email);
        
        // Проверка существования пользователя и совпадения пароля
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful!" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete('/:email', async (req, res) => {
    const userEmail = req.params.email;

    try {
        const result = await User.deleteByEmail(userEmail); // Implement this method in your User model
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(204).send(); // Successfully deleted
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;