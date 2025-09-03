const loginService = require("../service/LoginService");
async function authBearer(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);
  loginService.verifyToken(req, res, token, next);
}

module.exports = authBearer;