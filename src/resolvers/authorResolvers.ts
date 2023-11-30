import { Query, Resolver, Arg, Mutation, InputType, ObjectType, Field, Root, Int, FieldResolver } from "type-graphql";
import { News } from "./newsResolvers";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()



@ObjectType()
    class Author{
        @Field(() => Int)
        id: number

        @Field()
        name: string

        @Field({nullable: true})
        bio?: string

        @Field(() => String )
        createdAt : Date;

        @Field(() => [News])
        news : [News] // Will use this later for nested queries
    }
@InputType()
class CreateAuthorInput{
    @Field()
    name: string

    @Field({ nullable: true })
    bio?: string
}

@InputType()
class updateAuthorInput{
    @Field({nullable: true})
    name?: string

    @Field({nullable: true})
    bio?: string
}

@Resolver(Author)
export class authorResolvers {

    @Query(() => Author )
    async getAuthorById(@Arg("id", () => Int) id: number){
        try{

            const theAuthor = await prisma.author.findUnique({
                where: {id}
            })
            return theAuthor;

        }catch(error){
            
            return error;
        }
    }

    @Query(() => [Author])
    async getAllAuthors(){

        try{

            const allTheAuthors = await prisma.author.findMany();
            return allTheAuthors;

        }catch(error){
                return error
        }
    }

    @Mutation(() => Author)
    async addAuthor(@Arg("author", () => CreateAuthorInput) author: CreateAuthorInput){
        try{
            const theNewAuthor = await prisma.author.create({
                data: author
            })
            
            return theNewAuthor;

        }catch(error) {
            console.log({Success: "False", message: error })
            return false;
        }
    } 

    @Mutation(() => Author)
    async updateAuthor(
        @Arg("id", () => Int) id: number,
        @Arg("updatedAuthor", () => updateAuthorInput) updatedAuthor : updateAuthorInput){
            try{
                const theCreateAuthorInput = await prisma.author.update({
                    where: {id: id},
                    data : updatedAuthor
                })

                return theCreateAuthorInput;

            }catch(error){
                return error;
            }
        }
}

//Resolver below makes use of @Root to perform nested query
@Resolver(Author)
export class nestedResolver{

    @Query(() => Author )
    async author(
        @Arg("id", () => Int) id : number
    ){
        return await prisma.author.findUnique({
            where : {id}
        })
    }

    @FieldResolver(() => [News])
    async news(@Root() author : Author){
        return await prisma.news.findMany({
            where : {authorId : author.id }
        })
    }
}