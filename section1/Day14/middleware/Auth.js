const Auth=(req,res,next)=>{
    //Add item into food menu 
    //Authenticate: verify Krna padega ki kya yeh admin hi hai
    //Authorization: power hai

    //dummy code
    const token="ABCDEF"
    const Access=token==="ABCDEF"?1:0;
    if(!Access){
        res.status(403).send("Send Permission")
    }
    next();
}

module.exports={
    Auth,
}