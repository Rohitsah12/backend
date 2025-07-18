import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

interface UpdateParams{
    firstName:string;
    lastName:string;
}
async function updateUser(email:string,{
    firstName,lastName
}:UpdateParams) {
    await prisma.user.update({
        where:{email},
        data:{
            firstName,
            lastName
        }
    })
}
updateUser("harkirat@gmail.com",{
    firstName:"ROhit",
    lastName:"Sah"
})