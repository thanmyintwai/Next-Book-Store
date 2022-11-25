import GoogleStrategy from 'passport-google-oauth20'
import axios from 'axios'
import { keys } from '../config/keys.js'
import { prisma } from './graphQL.js'


const verifyCallback = async (accessToken, refreshToken, profile, done) =>{
    //console.log('coming from call back handler /auth/google/callback ')
    //console.log('access token', accessToken)
    console.log('found profile')
    console.log(profile)

    let serviceId = profile._json.sub
    let firstName = profile._json.given_name 
    let lastName = profile._json.family_name 
    let email = profile._json.email
    let provider = profile.provider 

    try{
        const user = await prisma.profile.findUnique({
            where: {
              serviceId
            },
          })
        if(user){
          return done(null, user)
        }else{
          const newUser = await prisma.profile.create({
            data:{
              serviceId, 
              provider, 
              firstName,
              lastName,
              email, 
            }
          }) 
          return done(null, newUser)
        }
        /* const response =await axios.get(`http://localhost:7000/users/${id}`)
        const existingUser = await response.data 
        return done(null, existingUser) */
    }catch(err){
        /* const response =await axios.post('http://localhost:7000/users', {
            id, name, email
        })
        const newUser = await response.data
        return done(null, newUser) */
        console.log(err)
    }
}

const socialLoginGoogleSetup = (passport) =>{
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        /* proxy: true */
    },//-----------step 7 ---------------
      verifyCallback))

      passport.serializeUser(async (user, done) => {
        //ok I got user info from call back function (down below)
        //I only need id which will be store in the cookie
        done(null, user.id);
      });
    
    //interpret the cookie  
    //id from coooke into user detail which is stored in DB
    passport.deserializeUser(async (id, done) => {
        //const response =await axios.get(`http://localhost:7000/users/${id}`)
        //const existingUser = await response.data
        //done(null, existingUser)
        const existingUser = await prisma.profile.findUnique({
          where: {
            id
          }
        })
        done(null, existingUser)    
      });

}

export default socialLoginGoogleSetup




