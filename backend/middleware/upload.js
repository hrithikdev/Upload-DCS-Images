const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "events", format: async () => "jpeg", public_id: (req, file) => file.originalname },
});

const upload = multer({ storage: storage });
module.exports = upload;
