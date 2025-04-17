const bcrypt=require("bcrypt");
const password="Rohit@123";

//hashcode+salt
async function Hashing(){
    // console.time("hash");
    // const salt=await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(password,10);
    // console.timeEnd("hash");
    console.log(salt);
    
    console.log(hashpass);

    const ans=await bcrypt.compare(password,hashpass);
    console.log(ans);
    

}

Hashing();