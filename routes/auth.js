import express from 'express'
const router = express.Router()


const authRouter = (passport) =>{

    router.get('/google',passport.authenticate('google',  {
        scope: ['profile', 'email'],
        /* session: false */
      })
    );

    router.get(
        '/google/callback', 
        //middle ware 1
        //-----------step 5 with code ---------------
        
        passport.authenticate('google',  /* {session: true},  */{
            
            failureRedirect: '/'
            //successRedirect:'/graphql',
            //failureRedirect: '/graphql'
        }), 
        //middle ware 2
        //-----------step 11 ---------------
        (req, res, next)=>{
           //console.log(req.user)
          //console.log('google callback is called')
          //res.send(req.user)
          res.redirect('/graphql')
        }) 

        router.get('/logout', (req, res, next)=>{
            req.logout(function(err) {
                  if (err) { console.log(err) }
                  res.redirect('/api/current_user')
                });
            })

    return router
}

export default authRouter
