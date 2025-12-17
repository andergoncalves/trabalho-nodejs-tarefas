const express = require('express');
const connectDatabase = require('./src/config/database');
const routes = require('./src/routes');

connectDatabase();

const app = express();
app.use(express.json());
app.use(routes);

module.exports = app;