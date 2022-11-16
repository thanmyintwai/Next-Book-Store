import cors from 'cors'
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/client';

const graphRouter = (server, graphQLServer)=>{
  //app.use('/graphql',
  const webServer = server
  webServer.use('/graphql',
  cors(), 
  bodyParser.json(), 
  expressMiddleware(graphQLServer, {
    context: async ({req, res}) => { 
       
        /* req, 
        res, 
        userId: req.session.passport ? req.session.passport.user : 'Guest' */
        //if(!req.session.passport){
        /* if(!req.user){
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                  code: 'UNAUTHENTICATED',
                  http: { status: 401 },
                },
              });
        }else{
            return {
                user: req.user,
                //prisma: new PrismaClient(),
                req, res 
            }
        } */
        return {
          req, res
        }
  }
  

}))  
}

export default graphRouter