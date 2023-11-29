import { Query, Resolver, Arg } from "type-graphql";
// import { Author } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

@Resolver()
export class newsResolvers {

    @Query(() => Boolean )
    async getAuthorById(@Arg("id") id: number){
        try{
            await prisma.author.findUnique({
                where: {id}
            })
            return true;
        }catch(error){
            return false;
        }
    }

    // @Mutation
}