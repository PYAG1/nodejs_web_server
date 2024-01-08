
const whiteList= [ "http://localhost:5000/"]

const credentials = (req,res,next)=>{
    const origin= req.headers.origin;
if(whiteList.includes(origin)){
    res.header('Access-Control-Allow-Credentials',true)
}
next()
}

const corsOption= {
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin)!== -1 || !origin){
            callback(null,true)
        }
        
        else{
            callback(new Error("not ajuhllowed by cors "))
        }
    },
    optionsSuccessStatus:200
}



module.exports= {corsOption,credentials}