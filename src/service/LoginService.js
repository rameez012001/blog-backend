const jwt = require("jsonwebtoken");

const { JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

const bcrypt = require("bcrypt");

class LoginService {
  issueAccessWebToken(sub) {
    return jwt.sign({ sub, role: "admin" }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15m",
    });
  }
  validateUserName(username) {
    return username === ADMIN_USERNAME;
  }
  async validatePassword(password) {
    return bcrypt.compare(password || "", ADMIN_PASSWORD);
  }

  verifyToken(req,res,token,next){
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err) return res.sendStatus(403);
        req.user = payload;
        next();
    })
  }
}
module.exports = new LoginService();
