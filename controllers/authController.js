const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Username or password required" });

  try {
    const foundUser = await User.findOne({ username: user }).exec();
    console.log(foundUser);

    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const roles = Object?.values(foundUser.roles);

      const accessToken = jwt.sign(
        { UserInfo: { username: foundUser.username, roles: roles } },
        process.env.ACCESS_TOKEN,
        { expiresIn: "120s" }
      );

      const refreshToken = jwt.sign(
        { UserInfo: { username: foundUser.username, roles: roles } },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      });

      // Send the successful response and return to avoid sending another response.
      return res.json({ accessToken });
    }
  } catch (error) {
    console.error(error);
  }

  // If the code reaches here, it means the password did not match.
  return res.sendStatus(401);
};

module.exports = { handleLogin };
