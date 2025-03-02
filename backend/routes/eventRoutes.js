const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../middleware/upload");

// Add a new event
router.post("/", upload.array("images", 15), async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path); // Get Cloudinary image URLs
        const event = new Event({ ...req.body, images: imageUrls });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: "Error adding event" });
    }
});

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Error fetching events" });
    }
});

// Delete an event
router.delete("/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting event" });
    }
});

module.exports = router;
