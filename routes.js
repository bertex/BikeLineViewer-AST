const path = require('path');
const express = require('express');
const usersController = require('./controllers/usersController');
const dataController = require('./controllers/dataController');

const router = express.Router();


router.use('/api/users', usersController);
router.use('/api/data', dataController);

// Root route
router.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static' ,'map.html'))
});


module.exports = router;
