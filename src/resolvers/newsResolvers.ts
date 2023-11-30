import { Query, Resolver, ObjectType, Mutation, Field, Int, InputType, Arg } from "type-graphql";
// import { Author } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


@InputType()
class CreateNewsInput{

    @Field()
    title : string

    @Field()
    content : string 

    @Field(() => Int)
    authorId : number 
}

@InputType()
class UpdateNewsInput {
    @Field({nullable : true})
    title? : string

    @Field({nullable : true})
    content? : string 

    @Field(() => Int, {nullable : true})
    authorId? : number 
}
@ObjectType()
class News{
    @Field( () => Int)
    id : number

    @Field()
    title : string

    @Field()
    content : string 

    @Field(() => Int)
    authorId : number 
}

@Resolver()
export class newsResolvers{
    @Query(() => [News])
    async getAllNews() {
        try{
            const allTheNews = await prisma.news.findMany();
            return allTheNews;
        }catch(error){
            return "Could not succeed";
        }
    }

    @Query(() => News )
    async getNewsById(@Arg("id", () => Int) id : number){
        try{
            return await prisma.news.findUnique({
                where : {id : id},
            })
        }catch(error){
            console.log(error)
            return error;
        }
    }
    @Mutation(() => News)
    async addNews(@Arg("theNews", () => CreateNewsInput) theNews : CreateNewsInput) {
        try{
            const createdNews = await prisma.news.create({
                data : theNews
            })
            return createdNews;
        }catch(error){
            return error;
        }  
    }

    @Mutation(() => News)
    async updateNews(
        @Arg("id", () => Int) id: number,
        @Arg("updatedNews", () => UpdateNewsInput) updatedNews : UpdateNewsInput
    ){
        try{
            const theUpdatedNews = await prisma.news.update({
                where : {id : id},
                data : updatedNews
            })
            return theUpdatedNews;
        } catch(error) {
            return error
        }
         

        
    }

}