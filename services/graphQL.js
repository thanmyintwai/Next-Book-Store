import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../schema.js'
import { resolvers } from '../resolvers.js'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

export const apolloInitiate = (httpServer) =>{
    const graphQLServer = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), 
            ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })],
        });

        return graphQLServer

}

/* interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
  }
  
  // Prevent multiple instances of Prisma Client in development
  declare const global: CustomNodeJsGlobal
  
  const prisma = global.prisma || new PrismaClient()
  
  if (process.env.NODE_ENV === 'development') global.prisma = prisma */

//single source of truth 
export const prisma = new PrismaClient()


//export default apolloInitiate

//Ref: https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/