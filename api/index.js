const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('./swagger.json');
const config = require('../config');
const user= require('./components/user/routes');
const auth= require('./components/auth/routes');
const errors = require('../network/errors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puesto ', + config.api.port);
});
