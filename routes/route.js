const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const agencyController = require('../controllers/agencyController');
const clientController = require('../controllers/clientController');
const reqValidation = require("../middleware/reqValidation")
const schemaValidation = require("../utils/validationSchema")

// Routes for CRUD operations
router.post('/createAgencyAndClient',reqValidation.validate(schemaValidation.createAgencyAndClient), agencyController.createAgencyAndClient);
router.put('/updateClient', reqValidation.validate(schemaValidation.updateClient), clientController.updateClient);
router.get('/agency/top-client', agencyController.getTopClientByAgency);

module.exports = router;
