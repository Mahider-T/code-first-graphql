import { Query, Resolver, Arg, Mutation, InputType, Field, Int } from "type-graphql";
// import { Author } from "@prisma/client";
import { Author, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


@InputType()
class NewAuthor{
    @Field()
    name: string

    @Field()
    bio?: string
}
@Resolver()
export class authorResolvers {

    @Query(() => Boolean )
    async getAuthorById(@Arg("id", () => Int) id: number){
        try{
            await prisma.author.findUnique({
                where: {id}
            })
            return true;
        }catch(error){
            return error;
        }
    }

    @Mutation(() => NewAuthor)
    async addAuthor(@Arg("author", () => NewAuthor) author: NewAuthor){
        try{
            const newAuthor = await prisma.author.create({
                data: author
            })
            // const newAuthor author
            console.log(newAuthor)
            return newAuthor
        }catch(error) {
            console.log({Success: "False", message: error })
            return false;
        }
    } 
}