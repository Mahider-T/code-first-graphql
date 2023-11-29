
@InputType{
    class updateHumanInput{
        @Field(() => String, { nullable : true }) 
        name?: string

        @Field(() => Int, { nullable: true })
        age?: number

        @Field(() => Boolean)
        verified: boolean

    }
}


@ObjectType {
    exports class human{
        @Field(type => Int)
        id: number

        @Field() 
        name: string

        @Field(type => Int)
        age: number

        @Field()
        verified: boolean

        @Field(type => [Book!])
        books: Array<Book>
    }
}


@Resolvers {
    export class humanResolvers{
        //get details of a single human
        @Query(() => Human)
        async getHumanInfo(@Args("id" , () => String) title: number){
            return await prisma.human.findUnique({ 
                where: {
                    id
                }
             })
        }

        @Mutation(() => Boolean)
        async updateHuman(@Args("id") id: number 
        @Args("input", () => updateHumanInput ) theInput: updateHumanInput ){
            const updatedHuman: Human = await prisma.human.update({
                where{
                    id: id
                },
                data: {
                    theInput
                }
            }) 
        }
    }
}