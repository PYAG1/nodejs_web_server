

const path = require("path");
const User = require("../model/User")

require("dotenv").config();

const handleLOGOUT = async (req, res) => {
    // Delete access token on the front end
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
  
    const refreshToken = cookies.jwt;
    const foundUser = User.findOne({refreshToken}).exec()
    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }
  
foundUser.refreshToken= ""
const result = await foundUser.save() // to save a chnage
console.log(result)
    res.clearCookie("jwt", { httpOnly: true,sameSite:"None",secure:true }); // Serves over HTTPS
    res.sendStatus(204);
  };
  
  module.exports = { handleLOGOUT };
  

module.exports = { handleLOGOUT };
