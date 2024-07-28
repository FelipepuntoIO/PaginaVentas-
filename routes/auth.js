const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send('Usuario registrado exitosamente');
    } catch (error) {
        res.status(400).send('Error al registrar el usuario');
    }
});

// Login de usuarios
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).send('Nombre de usuario o contraseña incorrectos');
        }
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send('Error al iniciar sesión');
    }
});

module.exports = router;
