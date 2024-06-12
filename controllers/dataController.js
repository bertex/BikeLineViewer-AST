const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint to serve GeoJSON data
router.get('/bikelanes', async (req, res) => {
    // Get GeoJSON file from opendata bcn
    try {
        const response = await axios.get('https://opendata-ajuntament.barcelona.cat/resources/bcn/CarrilsBici/CARRIL_BICI.geojson');
        res.json(response.data)
    }catch (error){
        console.error('Error Fetching api', error);
        res.status(500).send('Error Fetching JSON from API')
    }

    /*#swagger.responses[200] = {
        description: 'GeoJSON Data',
        content: { 'application/json': {} }
    }*/
});

router.get('/search', (req, res) => {
    const searchTerm = req.query.term;

    // Vulnerable code - rendering user input directly in HTML response
    res.send("alert('not implemented')");
});

module.exports = router;