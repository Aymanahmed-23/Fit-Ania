import jwt from 'jsonwebtoken';

// The middleware function
export function authenticateToken(req, res, next) {
    
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(' ')[1];

   
    if (token == null) {
        return res.status(401).json({ message: 'Token missing' });
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        
        req.user = user;
        next();
    });
}


