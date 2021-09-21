const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./users/users-router.js');
const authMiddleware = require('./auth/auth-middleware.js')
const plantsRouter = require('./plants/plants-router.js');
const authRouter = require('./auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', authMiddleware, usersRouter)

server.use('/api/plants', authMiddleware, plantsRouter)

server.use('/api/auth', authRouter)

module.exports = server;