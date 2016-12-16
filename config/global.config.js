"use strict";
module.exports = {
    appName: "RestServer",
    appDetails: {
        displayTitle: "Express-MVC",
        footerText: "2016 CodeByte. All rights reserved"
    },
    modules: ['home'],
    CORS: {
        isEnabled: true,
        domains: ['*'],//user * to allow all origins or http://foo.com, http://bar.com
        allowHeaders:['API-Token', 'Authorization', 'Content-Type', 'Keep-Alive'],
        exposeHeaders:['API-Token-Expiry']
    },
    defaultHeaders:{
        'Access-Control-Allow-Credentials':true,
        'Accept-Ranges': 'bytes'
    }
};