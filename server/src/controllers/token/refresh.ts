import { verifyToken } from "../../utils/verifyToken";
import { createToken } from "../../utils/createToken";
const refresh: Controller = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(200).json({ error: true, message: "No refresh cookie present" });
  }
  try {
    const token = verifyToken(req.cookies.token);
    if (!token) {
      return res.status(401).json({ error: true, message: "Token invalid" });
    }
    const AccessToken = createToken(false, token["userId"]);
    return res.status(200).json({
      success: true,
      message: "Refresh token verified",
      data: { AccessToken },
    });
  } catch (error) {
    next(error);
  }
};
export default refresh;