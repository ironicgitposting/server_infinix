/**
 * Middleware
 * Check BEARER auth token validity for specified route
 * next() if ok
 * reject() if nok
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // BEARER token
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'my_secret_key');
        // Give access to user data to any subsequent middleware or
        // request handler
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId,
        };
        next();
    } catch (error) {
        return res.status(401).json({
            error,
            message: 'Auth failure',
        });
    }
};
