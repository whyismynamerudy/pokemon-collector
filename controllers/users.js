const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

//create user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    // console.log(username, name, password);

    //username must be unique
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return response.status(400).json({
            error: "Username must be unique."
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name, 
        passwordHash,
        pokeData: []
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser); //201 CREATED
})

//get all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

const getTokenFrom = (myToken) => {
    if (myToken && myToken.toLowerCase().startsWith('bearer ')) {
        return myToken.substring(7);
    }

    return null;
};

//update user pokemon place
//post request must contain username and token and pokename and pokeimage
usersRouter.post('/collect-pokemon', async (request, response) => {
    const { username, token, pokeName, pokeImage } = request.body;

    const myToken = getTokenFrom(token);
    const decodedToken = jwt.verify(myToken, config.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    // const existingUser = await User.findOne({ username });
    // if (!existingUser) {
    //     return response.status(404).json({
    //         error: 'username doesn\'t exist'
    //     })
    // }

    const existingUser = await User.findById(decodedToken.id)

    const newPoke = {
        pokeName,
        pokeImage
    }

    existingUser.pokeData = existingUser.pokeData.concat(newPoke);
    await existingUser.save();

    response.status(201).json(existingUser);
});

//get all collected pokemon
usersRouter.post('/saved-pokemon', async (request, response) => {
    const { username, token } = request.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return response.status(404).json({
            error: 'username doesn\'t exist'
        })
    }

    response.json(existingUser.pokeData);
}),

module.exports = usersRouter;