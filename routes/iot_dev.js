var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongooseController = require('../controllers/mongooseController');
const sessionController = require('../controllers/session');

router.get('/history/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const locationName = sessionController.getLocationName(id);

    if (locationName === "Invalid location ID") {
      return res.status(400).json({ error: 'Invalid location ID' });
    }

    req.session.userId = id;
    req.session.locationName = locationName;

    let data2;
    let dataStatus;
    if (id === "ayerkeroh") {
      data2 = await mongooseController.returnAyerKerohData();
      dataStatus = await mongooseController.returnLatestAyerKerohDataStatus();
      
    } else if (id === "duriantunggal") {
      data2 = await mongooseController.returnDurianTunggalData();
      dataStatus = await mongooseController.returnLatestDurianTunggalDataStatus();
    }

    let page = 2;

    res.render('dev/history', { data: { id, locationName }, data2, dataStatus, page });

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
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }

    req.session.userId = id;
    req.session.locationName = locationName;

    let data2;
    let dataStatus;
    if (id === "ayerkeroh") {
      data2 = await mongooseController.returnAyerKeroh24Data();
      dataStatus = await mongooseController.returnLatestAyerKerohDataStatus();
    } else if (id === "duriantunggal") {
      data2 = await mongooseController.returnDurianTunggal24Data();    
      dataStatus = await mongooseController.returnLatestDurianTunggalDataStatus();  
    }
    let page = 4;
    res.render('dev/graph', { data: { id, locationName }, data2, dataStatus,page});
  } catch (error) {
    console.error('Error fetching data from Graph page:', error);
    res.status(500).json({ error: 'Failed to fetch data from Graph controller errors' });
  }

});

router.get('/graph/all/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const locationName = sessionController.getLocationName(id);

    if (locationName === "Invalid location ID") {
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }

    req.session.userId = id;
    req.session.locationName = locationName;

    let data2;
    let dataStatus;
    if (id === "ayerkeroh") {
      data2 = await mongooseController.returnAyerKerohData();
      dataStatus = await mongooseController.returnLatestAyerKerohDataStatus();
    } else if (id === "duriantunggal") {
      data2 = await mongooseController.returnDurianTunggalData();
      dataStatus = await mongooseController.returnLatestDurianTunggalDataStatus();
    }
    let page = 4;
    res.render('dev/graph', { data: { id, locationName }, data2, dataStatus, page });
  } catch (error) {
    console.error('Error fetching data from Graph page:', error);
    res.status(500).json({ error: 'Failed to fetch data from Graph controller errors' });
  }

});

router.get('/duriantunggal/latest', mongooseController.getLast10DurianTunggalData);
router.get('/ayerkeroh/latest', mongooseController.getLast10AyerKerohData);
router.get('/ayerkeroh/data', mongooseController.getAllAyerKerohData);
router.get('/duriantunggal/data', mongooseController.getAllDurianTunggalData);

router.get('/alert', async (req, res, next) => {
  try {
    sessionController.setDefaultSessionValues(req);

    // Fetching data asynchronously from the saveData function
    const data = await sessionController.saveData(req.session.userId, req.session.locationName);
    const data2 = await mongooseController.returnAlertData();
    // Rendering the 'iot/alert' view with the combined data
    let dataStatus;
    console.log("log: ",req.session.userId);
    
    if(req.session.userId === "ayerkeroh"){
      dataStatus = await mongooseController.returnLatestAyerKerohDataStatus();
    }else if(req.session.userId === "duriantunggal"){
      dataStatus = await mongooseController.returnLatestDurianTunggalDataStatus();
    }
    let page = 3;
    res.render('dev/alert', { data, data2, dataStatus, page});
  } catch (error) {
    console.log("fail");

    next(error); // Pass the error to the error handler middleware
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
    let dataStatus;
    if (id === "ayerkeroh") {
      data2 = await mongooseController.getLast24AyerKerohData();
      dataStatus = await mongooseController.returnLatestAyerKerohDataStatus();
      console.log("status ayerkeroh: ", dataStatus);
      
    } else if (id === "duriantunggal") {
      data2 = await mongooseController.getLast24DurianTunggalData();
      dataStatus = await mongooseController.returnLatestDurianTunggalDataStatus();
      console.log("status durian tunggal: ", dataStatus);
    }  
    
    let page = 1;
    res.render('dev/dashboard', { data:{ id, locationName } , data2, dataStatus, page});
  } catch (error) {
    console.error('Error fetching data from Home page:', error);
    res.status(500).json({ error: 'Failed to fetch data from mainpage controller errors' });
  }
});

module.exports = router;
