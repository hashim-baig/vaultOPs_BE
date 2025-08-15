const express = require('express');
const router = express.Router();
const { createDomain, getAllDomains } = require('../controllers/domainController');

// POST /api/domains
router.post('/', createDomain);
router.get('/', getAllDomains);

module.exports = router;
