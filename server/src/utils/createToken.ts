import jwt from "jsonwebtoken";
export const createToken = (refresh: boolean, id: number) => {
  const exp = "168h";

  const token = jwt.sign({ userId: id },process.env.JWT_KEY, { expiresIn: exp });
  const accessToken = { token, exp };
  if (refresh) {
    const refreshToken = jwt.sign({ userId: id }, process.env.JWT_KEY, {expiresIn: "7d"});
    return { accessToken, refreshToken };
  }
  return { accessToken };
};