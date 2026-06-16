import * as authService from '../services/auth.services.js';

export const getLogin = (req, res) => {
    res.render('login', { title: 'Login', errors: req.query.errors || null });
};

export const getRegister = (req, res) => {
    res.render('register', { title: 'Register', errors: req.query.errors || null });
};

export const register = (req, res) => {
    const { email, password, confirm } = req.body;

    if (!email || !password || !confirm || password !== confirm) {
        return res.redirect("/register?errors=Invalid registration details");
    }

    authService.createUser(email, password)
        .then(() => res.redirect('/login'))
        .catch((err) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                return res.redirect('/register?errors=Email already exists');
            }

            return res.redirect('/register?errors=Unable to register user');
        });
};