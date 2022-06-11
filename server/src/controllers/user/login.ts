import bcrypt from 'bcrypt';
import { user_model } from '../../db';
import { createToken } from '../../utils/createToken';
const login: Controller = async (req, res, next) => {
  try {
    const user = await user_model.findOne({
      where: { username: req.body.username },
    });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'User not found',
      });
    }
    console.log(user.password);

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        error: true,
        message: 'Invalid password',
      });
    }
    const token = createToken(true,user.id);
    return res
      .status(200)
      .cookie('token', token.refreshToken, {
        maxAge: 172800000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: 'Login success',
        success: true,
        data: { access: token.accessToken },
      });
  } catch (error) {
    next(error);
  }
};
export default login;
