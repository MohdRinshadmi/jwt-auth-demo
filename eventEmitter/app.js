const express = require('express');
const myEmitter = require('./eventEmitter');

const app = express();
const PORT = 3000;

app.use(express.json());

// listen for a custom event
myEmitter.on('userCreated', (user) => {
    console.log(`New user created: ${user.name}`)
})