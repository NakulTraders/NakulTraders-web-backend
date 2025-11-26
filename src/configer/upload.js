const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Factory function to create multer upload for a given folder
const upload = (folderName = "default") => {
  
  // Setup multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, `../../uploads/${folderName}`);

      // Create folder if missing
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      cb(null, dir);
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${file.fieldname}_${Date.now()}${ext}`;
      cb(null, filename);
    }
  });

  // Return multer instance
  return multer({
    storage,
    limits: {
      fileSize: 4 * 1024 * 1024, // 4MB
    },
  });
};

module.exports = { upload };
