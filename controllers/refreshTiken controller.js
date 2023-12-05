const userDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");

require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  console.log(cookies?.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = userDb.users.find(
    (item) => item.RefreshToken === refreshToken
  );

  if (!foundUser) {
    res.sendStatus(403); //forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || foundUser.username !== decoded?.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "400s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
 