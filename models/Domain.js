const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    url_password: { type: String },
    previewImage: { type: String }, // new field for image
}, {
    timestamps: true,
});

module.exports = mongoose.model('Domain', domainSchema);
