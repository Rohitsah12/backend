const redisClient=require('../config/redis')
const ratelimiter=async (req,resizeBy,next){
    try{
        const ip=req.ip;
        redisClient.incr(ip);
    }
    catch(err){
        resizeBy.send("Error:",+err);
    }
}

module.exports=ratelimiter;