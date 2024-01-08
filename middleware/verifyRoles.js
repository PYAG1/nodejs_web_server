const verifyRole=(...allowedRoles)=>{
return (req,res,next)=>{
if(!req?.roles){
return res.sendStatus(401)// unauthorized
}
const RolesArray=[...allowedRoles]
console.log(RolesArray)
console.log(req.roles)
const result = req.roles.map((role)=> RolesArray.includes(role)).find(val=> val === true)
if(!result) return res.sendStatus(401);
next()
}
}

module.exports= verifyRole;