const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    url_password: { type: String }, // optional
}, {
    timestamps: true,
});

module.exports = mongoose.model('Domain', domainSchema);
