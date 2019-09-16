const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api', require('./routes'));

server.use(errorHandler);

module.exports = server;