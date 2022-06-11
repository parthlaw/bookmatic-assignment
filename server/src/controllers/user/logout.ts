const logout: Controller = async (req, res, next) => {
  try {
    return res.clearCookie('token').status(200).json({
      message: 'Logout success',
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
export default logout;