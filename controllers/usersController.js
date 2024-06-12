const express = require('express');
const router = express.Router();

// In-memory storage for users
let users = [];

var n = 0;

// Route to create a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    newUser.id = n++;
    if (n === NaN) {
        console.log("n is not a number error");
    }
    users.push(newUser);
    res.status(201).json(newUser);
    /*
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/userSchemaInput"
                }  
            }
        }
    };
    #swagger.responses[201] = {
            description: 'User created',
            schema: { $ref: '#/components/schemas/userSchema' }
    }
    */
});

// Route to get all users
router.get('/', (req, res) => {
    //throw new Error("¡Ups, algo ha salido mal!");
    res.json(users);
    /*
    #swagger.responses[200] = {
        description: 'Array of users',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {$ref: '#/components/schemas/userSchema'}
                }
            }
        }
    }
    */
});

// Route to get a specific user by ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }

    /*
    #swagger.responses[200] = {
        description: 'User',
        schema: { $ref: '#/components/schemas/userSchema' }
    }
    #swagger.responses[404] = {
        description: 'User not found'
    }
    */
});

// Route to update a user by ID
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }

    /*
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/userSchemaInput"
                }  
            }
        }
    };
    #swagger.responses[200] = {
        description: 'User',
        schema: { $ref: '#/components/schemas/userSchema' }
    }
    */
});

// Route to delete a user by ID
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
