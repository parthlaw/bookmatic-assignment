import { verifyToken } from '../../utils/verifyToken';
const checkToken: Controller = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
      return res
        .status(400)
        .json({ error: true, message: 'No token provided' });
    }
    if (token.toString().startsWith('Bearer')) {
      token = token.slice(7, token.length);
    }
    const verified = verifyToken(token as string);
    if (!verified) {
      return res.status(400).json({ error: true, message: 'Incorrect Token' });
    }
    req['decode'] = verified;
    next();
  } catch (err) {
    res
      .status(500)
      .json({ error: true, message: 'Internal Server Error', data: { err } });
  }
};
export default checkToken;
