const eventEmitter = require('events');

class MyEmitter extends eventEmitter{}

const myEmitter = new MyEmitter();

module.exports = myEmitter;