export const accessControl = (req, res, next) => {
    const userIsAuthenticated = req.session && req.session.user;
    if (!userIsAuthenticated) {
        if (req.method === 'GET' && ['/signup', '/signin', '/home'].includes(req.path)) return next();
        if (req.method === 'POST' && req.path === '/signup') return next();
        return res.status(403).send('Access denied');
    }
    if (userIsAuthenticated) {
        if (req.method === 'GET' && ['/home', '/logout'].includes(req.path)) return next();
        if (req.method === 'GET' && ['/signup', '/signin'].includes(req.path)) return res.status(403).send('Already authenticated');
        if (req.method === 'POST' && req.path === '/signup') return res.status(403).send('Already signed up');
        return next();
    }
    next();
};