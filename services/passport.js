import GoogleStrategy from 'passport-google-oauth20'
import axios from 'axios'
import { keys } from '../config/keys.js'


const verifyCallback = async (accessToken, refreshToken, profile, done) =>{
    //console.log('coming from call back handler /auth/google/callback ')
    //console.log('access token', accessToken)
    console.log(profile)

    let id = profile._json.sub
    //let id = 1
    let name = profile._json.name 
    let email = profile._json.email

    try{
        const response =await axios.get(`http://localhost:7000/users/${id}`)
        const existingUser = await response.data 
        return done(null, existingUser)
    }catch(err){
        const response =await axios.post('http://localhost:7000/users', {
            id, name, email
        })
        const newUser = await response.data
        return done(null, newUser)
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
        const response =await axios.get(`http://localhost:7000/users/${id}`)
        const existingUser = await response.data
        done(null, existingUser)    
      });

}

export default socialLoginGoogleSetup




