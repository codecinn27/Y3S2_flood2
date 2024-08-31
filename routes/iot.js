var express = require('express');
var router = express.Router();
var mongooseController = require('../controllers/mongooseController');
const { getLocationName, setDefaultSessionValues, saveData, debuggingSession } = require('../controllers/session');

//Specific Routes with Parameters First:
router.get('/history/:id', async(req,res,next)=>{
  try{
    const { id } = req.params;
    const locationName = getLocationName(id);

    if (locationName === "Invalid location ID") {
      // Return a JSON response with an error message and a 400 status code
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }
    
    req.session.userId = id;
    req.session.locationName = locationName;
    const data = {id, locationName};
    res.render('iot/history',{data})
  }catch(error){
    console.error('Error fetching data from History page:', error);
    res.status(500).json({ error: 'Failed to fetch data from history controller errors' });   
  }
})


router.get('/graph/:id', function(req, res, next) {
  try{
    const { id } = req.params;
    const locationName = getLocationName(id);

    if (locationName === "Invalid location ID") {
      // Return a JSON response with an error message and a 400 status code
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }

    req.session.userId = id;
    req.session.locationName = locationName;
    const data = {id, locationName};
    res.render('iot/graph',{data})
  }catch(error){
    console.error('Error fetching data from Graph page:', error);
    res.status(500).json({ error: 'Failed to fetch data from Graph controller errors' });
  }

});

router.get('/durianTunggal/latest', mongooseController.getLast10DurianTunggalData);

router.get('/alert', async (req, res, next) => {
  try {
    
    setDefaultSessionValues(req);
    const data = await saveData(req.session.userId, req.session.locationName);

    res.render('iot/alert', { data });
  } catch (error) {
    console.log("fail");
    
    next(error); // Pass errors to the error handler middleware
  }
});

router.get('/about', async(req, res, next) =>{
  try{
    setDefaultSessionValues(req);
    const data = await saveData(req.session.userId, req.session.locationName);

    res.render('iot/about',{data})
  }catch(error){
    console.error('Error fetching data from About page:', error);
    res.status(500).json({ error: 'Failed to fetch data from about controller errors' });   
  }
});

router.get('/', function(req, res, next) {
  res.render('iot/dashboard2');
});

/* GET home page. // The most general route with parameters should be placed last */
router.get('/:id', function(req, res, next) {
  try {
    const { id } = req.params;
    const locationName = getLocationName(id);

    if (locationName === "Invalid location ID") {
      // Return a JSON response with an error message and a 400 status code
      return res.status(400).json({ error: 'Invalid location ID !!!' });
    }
    req.session.userId = id;
    req.session.locationName = locationName;

    const data = { id, locationName };    
    res.render('iot/dashboard', { data });
  } catch (error) {
    console.error('Error fetching data from Home page:', error);
    res.status(500).json({ error: 'Failed to fetch data from mainpage controller errors' });
  }
});

module.exports = router;
