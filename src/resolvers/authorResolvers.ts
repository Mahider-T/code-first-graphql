import { Query, Resolver, Arg, Mutation, InputType, ObjectType, Field, Int } from "type-graphql";
// import { Author } from "@prisma/client";
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

@Resolver()
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
            // const CreateAuthorInput author
            console.log(theNewAuthor)
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
    
    // @Author()
}