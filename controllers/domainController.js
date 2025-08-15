const Domain = require('../models/Domain');

// Create a new domain
exports.createDomain = async (req, res) => {
    try {
        const { name, url, url_password } = req.body;
        const domain = new Domain({ name, url, url_password });
        await domain.save();
        res.status(201).json(domain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find().sort({ createdAt: -1 });
        res.json(domains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};