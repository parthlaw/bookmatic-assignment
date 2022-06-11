import { user_model } from '../../db';

const getAuth: Controller = async (req, res, next) => {
  try {
    const user = await user_model.findOne({
      where: { id: req['decode'].userId },
    });
    return res.status(200).json({
      message: 'Token is valid',
      success: true,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};
export default getAuth;