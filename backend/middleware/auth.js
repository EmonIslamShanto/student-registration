import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
