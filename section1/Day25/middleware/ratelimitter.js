const redisClient=require('../config/redis')
const ratelimiter=async (req,resizeBy,next)=>{
    try{
        const ip=req.ip;
        const count=await redisClient.incr(ip);
        if(count==1){
            await redisClient.expire(3600);
        }
        if(count>60){
            throw new Error("User limit Excedded");
        }
        next();
    }
    catch(err){
        resizeBy.send("Error:",+err);
    }
}

module.exports=ratelimiter;