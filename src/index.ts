import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { authorResolvers } from "../src/resolvers/resolvers"
// import { Application } from "express-serve-static-core";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const apolloServer = 
(async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ 
            resolvers: [authorResolvers],
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


