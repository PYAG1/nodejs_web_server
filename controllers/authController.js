const userDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fspromies = require("fs").promises;
require("dotenv").config();
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Username or password required" });
  const foundUser = userDb.users.find((item) => item.username === user);

  if (!foundUser) {
    res.sendStatus(401); ///unauthorized
  }
  //evaluate password
  const match = await bcrypt.compare(password, foundUser.hashpwd);
  if (match) {
    const roles = Object?.values(foundUser.roles);
    //creat jwts
    const accessToken = jwt.sign(
      { "UserInfo": {"username": foundUser.username, "roles": roles } },
      process.env.ACCESS_TOKEN,
      { expiresIn: "120s" }
    );
    const RefreshToken = jwt.sign(
      { "UserInfo": {"username": foundUser.username, "roles": roles } },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    //saving refresh token
    const otherUsers = userDb.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, RefreshToken };
    userDb.setUsers([...otherUsers, currentUser]);
    await fspromies.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDb.users)
    );
    res.cookie("jwt", RefreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    res.json({ accessToken });
  }
  res.sendStatus(401);
};

module.exports = { handleLogin };
