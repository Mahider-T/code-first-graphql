import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { newsResolvers } from "../src/resolvers/resolvers.js"
// import { Application } from "express-serve-static-core";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const apolloServer = 
(async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ resolvers: [newsResolvers]}),
        context: ({req, res}) => ({req, res})
    })
    apolloServer.applyMiddleware({app, cors: false})
    app.listen(3000, () => {
        console.log("Connected on port 3000")
    })
})()


