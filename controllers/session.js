const { AyerKeroh, DurianTunggal } = require('../models/ver1'); // Import your models

// Define a function to get the location name based on the id
const getLocationName = (id) => {
    switch(id){
        case 'ayerkeroh':
            return "Ayer Keroh";
        case 'duriantunggal':
            return "Durian Tunggal";
        default:
            return "Invalid location ID"; // Return an error message for invalid id
    }
};

function setDefaultSessionValues(req) {
    
    if (!req.session.userId) {
        req.session.userId = 'ayerkeroh';
    }
    if (!req.session.locationName) {
        req.session.locationName = 'Ayer Keroh';
    }
    
}

const saveData = async (id, location) => {
    if (!id || !location) {
        throw new Error("Invalid data provided to saveData.");
    }

    const data = {
        id: id,
        locationName: location,
    };
    console.log(data.id, " ", data.locationName);

    return data;
};

function debuggingSession(req){
    console.log("Session Id: ", req.session.userId);
    console.log("Session Location Name", req.session.locationName);
    
} 

const saveDataStatus = async (id, location) => {
    let status = '';

    if (id === 'ayerkeroh') {
        const latestData = await AyerKeroh.findOne().sort({ createdAt: -1 });
        if (latestData) {
            status = latestData.status;
        }
    } else if (id === 'duriantunggal') {
        const latestData = await DurianTunggal.findOne().sort({ createdAt: -1 });
        if (latestData) {
            status = latestData.status;
        }
    }

    const data = {
        id: id,
        locationName: location,
        status: status
    };

    return data;
};

module.exports = {
    getLocationName,
    setDefaultSessionValues,
    saveData,
    saveDataStatus,
    debuggingSession
};
