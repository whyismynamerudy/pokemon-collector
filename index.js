const app = require('./app');
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app);

console.log(config.PORT);

server.listen(config.PORT, () => {
    console.log(`server running on ${config.PORT}`)
});

// const config = require('./utils/config') //need to import this essentially everywhere as long as I'm accessing env pariables
// const express = require('express')
// const app = express();
// const cors = require('cors')

// app.use(cors());
// app.use(express.json()); //this is what allows backend to recieve json from frontend

// app.get('/', (request, response) => {
//     response.send('<p>yo</p>');
// })

// app.listen(config.PORT, () => {
//     console.log(`server running on ${config.PORT}`)
// })