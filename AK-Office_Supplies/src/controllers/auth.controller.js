import * as authService from '../services/auth.services.js';

export const getLogin = (req, res) => {
    res.render('login', { title: 'Login', errors: req.query.errors || null, user: req.session.user });
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await authService.findUserByUsername(username);
    const matchedPasswords = await authService.validatePassword(password, user.password);

    if (!user || !matchedPasswords) {
        return res.redirect("/login?errors=Invalid credentials");
    }

    req.session.user = {
        userId: user.userId,
        username: user.username,
        role: user.role
    }
    return res.redirect("/");
};

export const getRegister = (req, res) => {
    res.render('register', { title: 'Register', errors: req.query.errors || null, user: req.session.user });
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

export const logout = (req, res) => {
    res.clearCookie('connect.sid');
    res.redirect('/')
}

export const requireAuth = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    if(req.url.startsWith('/api')){
        return res.status(401).json({
            error: "Unauthoriezed"
        })
    }
    return res.redirect('/login?errors=Please log in first');
}