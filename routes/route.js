const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const agencyController = require('../controllers/agencyController');
const clientController = require('../controllers/clientController');

// Routes for CRUD operations
router.post('/agency', auth, agencyController.createAgencyAndClient);
router.put('/client/:id', auth, clientController.updateClient);
router.get('/agency/top-client', auth, agencyController.getTopClientByAgency);

module.exports = router;
