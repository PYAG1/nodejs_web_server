const userDB = {
    users:require("../model/users.json"),
    setUsers:function (data){
        this.users= data
    }
}
const fspromies= require("fs").promises;
const path = require("path");
//you use Bcriypt to hash passwords
const bcrypt = require("bcrypt")


const handleNewUser=async (req,res)=>{
const {user,password}= req.body
if(!user || !password){
  return  res.status(400).json({"error":"User and password are required"})
}
//check for duplicate usernames in db


//409 means conflict
const duplicates = userDB.users.find(person=> person.username === user);
if(duplicates){
    return res.sendStatus(409);
}
try {
    const hashedpws= await bcrypt.hash(password,10)
    //store new user
    const newUser= {"username":user,"hashpwd":hashedpws}
    userDB.setUsers([...userDB.users,newUser])

    await fspromies.writeFile(
        path.join(__dirname,"..","model","users.json"),JSON.stringify(userDB.users)
    )
    console.log(userDB.users)
    res.status(201).json({"message":"user was created"})
} catch (error) {
    res.status(500).json({"error":`${error}`})
}
}

module.exports={handleNewUser}