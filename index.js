import express from 'express'
import session from 'express-session';
import passport from 'passport'
import http from 'http';

import socialLoginGoogleSetup from './services/passport.js';
import authRouter from './routes/auth.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const PORT = 5000

const app = express()
const httpServer = http.createServer(app);

import { apolloInitiate } from './services/graphQL.js'

import graphRouter from './routes/graph.js'

import conSQlite3 from 'connect-sqlite3'


const SQLiteStore = conSQlite3(session);


app.use(session({
    //genid: (req) => uuidv4(),
    store: new SQLiteStore,
    secret: 'fiejie883fijeijfj',
    resave: false,
    saveUninitialized: false,
    cookie:{ secure: false, maxAge: 24 * 60* 60* 1000 }
})); 

 /*  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  )
 */


socialLoginGoogleSetup(passport)

app.use(passport.initialize());
app.use(passport.session());


const graphQLServer = apolloInitiate(httpServer)
await graphQLServer.start()

/* app.use('/graphql',
  cors(), 
  bodyParser.json(), 
  expressMiddleware(graphQLServer, {
    context: async ({req, res}) => ({ 
        req, 
        res, 
        userId: req.session.passport ? req.session.passport.user : 'Guest'
  })
  }))  
 */
graphRouter(app, graphQLServer)

app.get('/', (req, res, next)=>{
    res.send({'greeding': 'Hello From GraphQL Server:)'})
})

const autRouter = authRouter(passport)
app.use('/auth', autRouter)

app.get('/api/current_user', (req, res,next)=>{
    console.log(req.session)
    if(!req.user){
        res.send('Guess Login')
    }else{
        res.send(`current user id ${req.user.name}`)
    }
    
})
//app.listen(PORT)
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:5000/`);