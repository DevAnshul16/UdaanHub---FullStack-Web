// Middleware to authorize users based on their roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check if user is authenticated (should be set by protect middleware)
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Check if user's role is in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required role: ${roles.join(" or ")}. Your role: ${req.user.role}`,
            });
        }

        next();
    };
};
