/* // keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys
    module.exports = require('./prod');
  } else {
    // we are in development - return the dev keys!!!
    module.exports = require('./dev');
  } 
}*/
export const keys = {
    googleClientID: '888740606645-jsgmfo4i3hpsfii6esq88ak6rmr7oi35.apps.googleusercontent.com',
    googleClientSecret: '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',
    mongoURI: 'mongodb+srv://j0hn:QkUHXqA7CY326LnK@cluster0.ftgvjh1.mongodb.net/?retryWrites=true&w=majority',
    cookieKey: 'ifeth030aifx-fiejfie3',
    stripePublishableKey: 'pk_test_51Lpp7pCORcZ0tXRCrQnBon0YuO7MJjpC1XfgM2wf9wizBWVbYfTY3O9kxju6XDV6gDc993747scVV8baZ2eKCMMz00rdM7MPG2',
    stripeSecretKey: 'sk_test_51Lpp7pCORcZ0tXRCCfgccgugp2DaNWgTucYJOjcW1tGRSekfSam1Kn6CF4zFw4BR6pq7mnz9IELmm6HE0dSNCAKe00ammj5z61',
    sendGridKey: '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',
    redirectDomain: 'http://localhost:3000'
}

