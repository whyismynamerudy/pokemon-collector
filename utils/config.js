require('dotenv').config();
//console.log(process.env);

let PORT = process.env.PORT || 3001;
let MONGODB_URL = process.env.MONGODB_URL;
let SECRET = process.env.SECRET_JWT_KEY;

module.exports = {
    PORT,
    MONGODB_URL,
    SECRET
};