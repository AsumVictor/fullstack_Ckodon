const allowedOrigins = require('./allowedOrigin')
const corsOptions = {
    origin: (origin, callback)=>{
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        }else{
            callback(new Error('Not allows to by cors'))
        }
    },

    credential: true,
    optionSuccessStatus: 200
}

module.exports = corsOptions