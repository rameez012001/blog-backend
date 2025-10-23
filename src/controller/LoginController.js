import LoginService from "../service/LoginService.js";

const loginService = new LoginService();

export default class LoginController {
  async adminLogin(req, res) {
    try {
      const { username, password } = req.body || {};
      if (!loginService.validateUserName(username))
        return res
          .status(401)
          .json({ message: "user Credentials", error: "Unauthorized" });

      if (!(await loginService.validatePassword(password)))
        return res
          .status(401)
          .json({ message: "password Credentials", error: "Unauthorized" });

      const token = loginService.issueAccessWebToken(username);
      res.cookie("accessToken",token,{
        httpOnly:true,
        sameSite: process.env.SAME_SITE,
        secure: process.env.NODE_ENV === "production",
      })

      return res.status(200).json({
        message: "Login successful",
      });
    }catch(err) {
      return res.status(500).json({
        error: "ServerError",
        message: "Something went wrong",
      });
    }
  }
  async logout(req, res) {
    res.clearCookie("accessToken",{
      httpOnly:true,
      sameSite: process.env.SAME_SITE,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({message:"Logout Successful"});
  }
  
}