const { ref } = require("joi");
const { logger } = require("../../middleware/loggers/logger");
const authService = require("./auth_users.service");
const { loginUserSchema, registerSchema } = require("./dto/auth_users.joi");

module.exports.loginUser = async (req, res, next) => {
  const { identifier, password } = req.body;
  const { error } = loginUserSchema.validate({
    identifier,
    password,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const result = await authService.login(identifier, password);
    if (result === null) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", bool: false });
    }
    const { token, refresh, username, email, id, enc_role } = result;
    logger.info({ message: "User logged in" });
    return res
      .status(200)
      .json({
        message: "Login successful",
        bool: true,
        token,
        refresh,
        username,
        email,
        id,
        enc_role,
      });
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { error } = registerSchema.validate({
    firstName,
    lastName,
    email,
    password,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    if ((await authService.userExists(email)) === true) {
      return res.json({ message: "user already exists", bool: false });
    }
    const username = await authService.register(
      firstName,
      lastName,
      email,
      password
    );
    return res
      .status(201)
      .json({ message: "User created successfully", bool: true, username });
  } catch (err) {
    next(err);
  }
};

module.exports.getRefresh = async (userid) => {
  try {
    const refresh = await authService.getRefresh(userid);
    return refresh;
  } catch (err) {
    next(err);
  }
};

module.exports.forgotPassowrd = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await authService.userExists(email);
    if (!userExists) {
      return res.status(404).json({ message: "Email is not registered" });
    }
    await authService.sendEmail(email);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { password, token } = req.body;
    await authService.resetPassword(password, token);
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};

// module.exports.verifyToken=async(req,res,next)=>{
//   try{
//     res.json({message:"verified",bool:true});
//   }
//   catch(err){
//     next(err)
//   }
// }
