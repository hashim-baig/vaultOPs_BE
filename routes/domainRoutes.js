const express = require('express');
const router = express.Router();
const { createDomain, getAllDomains } = require('../controllers/domainController');
const auth = require('../middleware/authMiddleware');

router.use(auth)

// /api/domains
router.post('/', createDomain);
router.get('/', getAllDomains);

module.exports = router;
