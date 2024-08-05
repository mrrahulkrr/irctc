
const adminMiddleware = (req, res, next) => {
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    console.log(req.user.role)
    next();
  };
  
  module.exports = adminMiddleware;