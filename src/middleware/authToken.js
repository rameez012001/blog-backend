import LoginService from "../service/LoginService.js";

const loginService = new LoginService();

export default async function authBearer(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);
  loginService.verifyToken(req, res, token, next);
}