const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // Stores Cloudinary image URLs
});

module.exports = mongoose.model("Event", EventSchema);
