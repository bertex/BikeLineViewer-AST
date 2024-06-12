const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const bodyParser = require('body-parser');

//Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();
const port = 3000;

app.use(session({
  cookie: {httpOnly: false},
  secret: 'keyboard cat',
})),

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Swagger
app.use('/api/doc/swagger.json', express.static('./swagger_output.json'))
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Routes
app.use(routes);


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
