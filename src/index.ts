import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { authorResolvers, nestedResolver } from "./resolvers/authorResolvers"
import { newsResolvers } from "./resolvers/newsResolvers";

(async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ 
            resolvers: [authorResolvers, newsResolvers, nestedResolver],
            validate: { forbidUnknownValues: false } 
        }),
        context: ({req, res}) => ({req, res})
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app: app as express.Application, cors: true})
    app.listen(3000, () => {
        console.log("Connected on port 3000")
    })
})();


