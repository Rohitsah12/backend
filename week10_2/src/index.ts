import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

async function insertUser(email:string, password:string,firstName:string,) {
    prisma.user.create({
        email,
        password
    })
}