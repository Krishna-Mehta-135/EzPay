const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../models/user.model.js');
const { default: mongoose } = require('mongoose');

const accountRouter = express.Router();


export {accountRouter}