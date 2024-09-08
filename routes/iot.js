var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongooseController = require('../controllers/mongooseController');
const sessionController = require('../controllers/session');

const axios = require('axios');
const https = require('https');

router.get('/history/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const locationName = sessionController.getLocationName(id);

    if (locationName === "Invalid location ID") {
      return res.status(400).json({ error: 'Invalid location ID' });
    }

    req.session.userId = id;
    req.session.locationName = locationName;

    let data2, apiUrl;
    if (id === "ayerkeroh") {
      apiUrl = 'https://floodzte5g.azurewebsites.net/ayerkeroh/data';
    } else if (id === "duriantunggal") {
      apiUrl = 'https://floodzte5g.azurewebsites.net/duriantunggal/data';
    }

    // Fetch data from the respective API URL
    const response = await fetch(apiUrl);
    data2 = await response.json();

    res.render('iot/history', { data: { id, locationName }, data2 });

  } catch (error) {
    console.error('Error fetching data for history page:', error);
    res.status(500).json({ error: 'Failed to fetch data from history controller' });
  }
});


router.get('/graph/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const locationName = sessionController.getLocationName(id);

    if (locationName === "Invalid location ID") {
      // Return a JSON response with an error message and a 400 status code
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }

    req.session.userId = id;
    req.session.locationName = locationName;

    let data2;
    if (id === "ayerkeroh") {
      data2 = await mongooseController.returnAyerKerohData();
    } else if (id === "duriantunggal") {
      data2 = await mongooseController.returnDurianTunggalData();
    }

    res.render('iot/graph', { data: { id, locationName }, data2 });
  } catch (error) {
    console.error('Error fetching data from Graph page:', error);
    res.status(500).json({ error: 'Failed to fetch data from Graph controller errors' });
  }

});

router.get('/duriantunggal/latest', mongooseController.getLast10DurianTunggalData);
router.get('/ayerkeroh/latest', mongooseController.getLast10AyerKerohData);
router.get('/ayerkeroh/data', mongooseController.getAllAyerKerohData);
router.get('/duriantunggal/data', mongooseController.getAllDurianTunggalData);

router.get('/alert/:id', function(req, res, next) {
  const { id } = req.params;

  // Define URLs based on the location ID
  const url = id === "ayerkeroh"
    ? 'https://floodzte5g.azurewebsites.net/ayerkeroh/data'
    : id === "duriantunggal"
    ? 'https://floodzte5g.azurewebsites.net/duriantunggal/data'
    : null;

  if (!url) {
    return res.status(400).json({ error: 'Invalid location ID' });
  }

  // Fetch data from the selected URL
  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        res.render('iot/alert', { data: jsonData, id });
      } catch (e) {
        next(e); // Handle JSON parse errors
      }
    });

  }).on('error', (err) => {
    next(err); // Handle request errors
  });
});  

router.get('/', async (req, res, next) => {
  try {
    sessionController.setDefaultSessionValues(req);
    const data = await sessionController.saveData(req.session.userId, req.session.locationName);

    res.render('iot/about', { data })
  } catch (error) {
    console.error('Error fetching data from About page:', error);
    res.status(500).json({ error: 'Failed to fetch data from about controller errors' });
  }
});


/* GET home page. // The most general route with parameters should be placed last */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const locationName = sessionController.getLocationName(id);

    if (locationName === "Invalid location ID") {
      // Return a JSON response with an error message and a 400 status code
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }
    req.session.userId = id;
    req.session.locationName = locationName;
    
    let data2;
    if (id === "ayerkeroh") {
      data2 = await mongooseController.getLast24AyerKerohData();
    } else if (id === "duriantunggal") {
      data2 = await mongooseController.getLast24DurianTunggalData();
    }  
    res.render('iot/dashboard', { data:{ id, locationName } , data2});
  } catch (error) {
    console.error('Error fetching data from Home page:', error);
    res.status(500).json({ error: 'Failed to fetch data from mainpage controller errors' });
  }
});

module.exports = router;
