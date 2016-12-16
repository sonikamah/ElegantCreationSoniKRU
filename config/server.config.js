"use strict";
var config = {
    development: {
        port: "3000",
        smtp: {
            host: "smtp.abc.com", // hostname
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "abc@abc.com",
                pass: "abc"
            }
        },
        mongo: {
            'host': 'localhost',
            'database': 'local_db',
            'port': '27017'
        },
        app: {
            domain: "http://localhost:3000",
            auth: {
                token_secret: "32e6e8f6aedbb8416b5a35a1ba1ca83b421b5bfa",
                expiry: 15//days
            }
        },
        mysql: {
            host: 'localhost',
            user: 'root',
            database: 'localdb',
            password: ''
        },
        oauth: {
            facebook: {
                client_id: '',
                client_secret: '',
                redirect_uri: '',
                access_token_url: '',
                graph_api_url: ''
            },
            google: {
                client_id: '',
                client_secret: '',
                redirect_uri: '',
                access_token_url: '',
                peopleApiUrl: ''
            }
        }
    },
    staging: {
        port: "3001",
        smtp: {
            host: "smtp.abc.com", // hostname
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "abc@abc.com",
                pass: "abc"
            }
        },
        mongo: {
            'host': 'localhost',
            'database': 'local_db',
            'port': '27017'
        },
        app: {
            domain: "http://localhost:3001",
            auth: {
                token_secret: "32e6e8f6aedbb8416b5a35a1ba1ca83b421b5bfa",
                expiry: 15//days
            }
        },
        mysql: {
            host: 'localhost',
            user: 'root',
            database: 'localdb',
            password: ''
        },
        oauth: {
            facebook: {
                client_id: '',
                client_secret: '',
                redirect_uri: '',
                access_token_url: '',
                graph_api_url: ''
            },
            google: {
                client_id: '',
                client_secret: '',
                redirect_uri: '',
                access_token_url: '',
                peopleApiUrl: ''
            }
        }
    },
    production: {
        port: "3002",
        smtp: {
            host: "smtp.abc.com", // hostname
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "abc@abc.com",
                pass: "abc"
            }
        },
        mongo: {
            'host': 'localhost',
            'database': 'local_db',
            'port': '27017'
        },
        app: {
            domain: "http://localhost:3002",
            auth: {
                token_secret: "32e6e8f6aedbb8416b5a35a1ba1ca83b421b5bfa",
                expiry: 15//days
            }
        },
        mysql: {
            host: 'localhost',
            user: 'root',
            database: 'localdb',
            password: ''
        },
        oauth: {
            facebook: {
                client_id: '',
                client_secret: '',
                redirect_uri: '',
                access_token_url: '',
                graph_api_url: ''
            },
            google: {
                client_id: '',
                client_secret: '',
                redirect_uri: '',
                access_token_url: '',
                peopleApiUrl: ''
            }
        }
    }
};
module.exports = function(mode) {
    return config[mode || process.env.ENV || 'development'] || config.development;
};