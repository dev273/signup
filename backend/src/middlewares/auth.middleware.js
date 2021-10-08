import jwt from 'jsonwebtoken';
import User from '../models/user.model';

async function isAuthenticated(req, res, next) {
  const secret = process.env.JWT_SECRET;

  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res
          .status(401)
          .json({ success: false, error: 'Unauthenticated' });
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        req.user = await User.findOne({ email: req.jwt.email });
        if (!req.user) {
          return res
            .status(403)
            .json({ success: false, error: 'Unauthorised' });
        }
        next();
      }
    } catch (err) {
      console.error(err);
      return res.status(403).json({ success: false, error: 'Unauthorised' });
    }
  } else {
    return res.status(401).json({ success: false, error: 'Unauthenticated' });
  }
}

export default isAuthenticated;
