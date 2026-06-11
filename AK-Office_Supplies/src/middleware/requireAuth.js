// Auth gate: only let the request through if a session user exists.
// SSR pages -> redirect to /login. API routes -> 401 JSON.


export const requireAuth = (req, res, next) => {
    if (req.session?.userId) {
        return next();
    }

    if (req.originalUrl.startsWith('/api')) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    return res.redirect('/login');
};