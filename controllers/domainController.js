const Domain = require('../models/Domain');
const puppeteer = require('puppeteer');
const path = require('path');

// Helper to get screenshot of a URL
async function getUrlPreview(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

    // Generate unique filename
    const filename = `${Date.now()}-preview.png`;
    const filePath = path.join(__dirname, '../uploads', filename);
    await page.screenshot({ path: filePath, fullPage: false });

    await browser.close();
    return `/uploads/${filename}`; // Assuming /uploads is served statically
}

// Create a new domain
exports.createDomain = async (req, res) => {
    try {
        const { name, url, url_password } = req.body;

        // 1. Get screenshot for preview
        let previewImage = null;
        try {
            let previewImage = await getUrlPreview(url);
        } catch (err) {
            console.error('Failed to generate preview:', err.message);
            previewImage = null;
        }

        // 2. Save domain info along with preview image path
        const domain = new Domain({ name, url, url_password, previewImage });
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