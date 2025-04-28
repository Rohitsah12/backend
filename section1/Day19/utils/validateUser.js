const validator=require("validator")
function validateUser(data){
    //validate kya uske andar firstName
            //req.body ke andrr data aaya hai , usmein first_name present hona chaiye
            const mandatoryField=["firstName","emailId","age"];
    
            const IsAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k));
    
            if(!IsAllowed){
                throw new Error("Field missing")
            }
    
            if(!validator.isEmail(data.emailId))
                throw new Error("Invalid EMail");

            if(!validator.isStrongPassword(data.password))


}

module.exports=validateUser;