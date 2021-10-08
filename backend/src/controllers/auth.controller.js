import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userService from '../services/user.service';

class AuthController {
  async signup(req, res) {
    try {
      const userByEmail = await userService.findByEmail(req.body.email);
      if (userByEmail) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this email',
        });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);

      await userService.create({
        ...req.body,
        role: 'user',
      });

      const jwtSecret = process.env.JWT_SECRET;
      const token = await jwt.sign(
        {
          email: req.body.email,
        },
        jwtSecret
      );
      res.status(201).json({ success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async login(req, res) {
    try {
      const userByEmail = await userService.findByEmail(req.body.email);

      if (!userByEmail) {
        return res
          .status(401)
          .json({ success: false, error: 'Authentication failed' });
      }
      //check if password matches with the Hash
      const match = await bcrypt.compare(
        req.body.password,
        userByEmail.password
      );

      if (!match) {
        return res
          .status(401)
          .json({ success: false, error: 'Authentication failed' });
      }

      const jwtSecret = process.env.JWT_SECRET;
      const token = await jwt.sign(
        {
          email: req.body.email,
        },
        jwtSecret
      );
      res.status(200).json({ success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async me(req, res) {
    try {
      res.status(200).json({ success: true, user: req.user });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
}

export default new AuthController();
