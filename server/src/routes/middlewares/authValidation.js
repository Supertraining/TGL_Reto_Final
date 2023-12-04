const jwtHandle = require('../../utils/jwt.handle')
require('dotenv').config()
function isAuthenticated(req, res, next) {
    
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('unauthorized')
    }
    
    jwtHandle.verifyToken(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            
            return res.status(403).send('Forbidden')
        }
        req.user = payload;
        next();
    })
}

module.exports = isAuthenticated;