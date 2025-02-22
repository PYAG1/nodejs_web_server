const User = require("../model/User")
//you use Bcriypt to hash passwords
const bcrypt = require("bcrypt");
const ROLES_LIST = require("../config/roles_list");


const handleNewUser=async (req,res)=>{
const {user,password}= req.body
if(!user || !password){
  return  res.status(400).json({"error":"User and password are required"})
}
//check for duplicate usernames in db


//409 means conflict
const duplicates = await User.findOne({username:user}).exec()
if(duplicates){
    return res.sendStatus(409);
}
try {
    const hashedpws= await bcrypt.hash(password,10)
    //create and store new user
    const result=await User.create( {"username":user,"password":hashedpws})

    console.log(result )
    res.status(201).json({"message":"user was created"})
} catch (error) {
    res.status(500).json({"error":`${error}`})
}
}

module.exports={handleNewUser}