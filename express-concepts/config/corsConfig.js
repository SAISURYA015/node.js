const cors = require('cors');

const configureCors = () => {
  return cors({
    //origin  -> this will tell that which origin you want user can access your api
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000', //local development
        'https://yourcustomdomain.com' //production domain
      ]
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true) //giving permission so that req can be allowed
      } else {
        callback(new Error('Not allowed by cors'))
      }

    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept-Version'
    ],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true,  //enable supports to cookies
    preflightContinue: false,
    maxAge: 600,  //cache pre flight responses for 10 mins (600 seconds) -> avoid sending opions requests multiple times
    optionsSuccessStatus: 204
  })
}

module.exports = { configureCors };