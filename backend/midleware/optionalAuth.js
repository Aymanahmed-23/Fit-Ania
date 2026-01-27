import jwt from "jsonwebtoken";

export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // ✅ No token → continue as guest
  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err) {
      req.user = user; // ✅ attach user if valid
    }
    // invalid token → still continue as guest
    next();
  });
}
