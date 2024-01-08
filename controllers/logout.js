const userDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fspromises = require("fs").promises;
const path = require("path");


require("dotenv").config();

const handleLOGOUT = async (req, res) => {
    // Delete access token on the front end
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
  
    const refreshToken = cookies.jwt;
    const foundUser = userDb.users.find(
      (item) => item.RefreshToken === refreshToken
    );
  
    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }
  
    const otherUsers = userDb.users.filter((item) => item.RefreshToken !== foundUser?.RefreshToken);
    const currentUser = { ...foundUser, refreshToken: "" };
    userDb.setUsers([...otherUsers, currentUser]);
  
    try {
      await fspromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDb.users, null, 2));
    } catch (error) {
      console.error("Error writing to users.json:", error);
      return res.status(500).send("Internal Server Error");
    }
  
    res.clearCookie("jwt", { httpOnly: true,sameSite:"None",secure:true }); // Serves over HTTPS
    res.sendStatus(204);
  };
  
  module.exports = { handleLOGOUT };
  

module.exports = { handleLOGOUT };
