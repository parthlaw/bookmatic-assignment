import { user_model } from '../../db';
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/createToken';
const register: Controller = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.username || !req.body.password || !req.body.name) {
      return res.status(400).json({
        error: true,
        message: 'Username,password and name are required',
      });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await user_model.create(req.body);
    const token = createToken(true, user.id);
    return res
      .status(200)
      .cookie('token', token.refreshToken, {
        maxAge: 172800000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({
        message: 'Register success',
        success: true,
        data: { accessToken: token.accessToken, user },
      });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: true,
        message: 'Username already exists',
      });
    }
    next(error);
  }
};
export default register;
