import jwt from "jsonwebtoken";
export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};