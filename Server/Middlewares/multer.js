import multer from "multer";

const storage = multer.memoryStorage(); // file ko RAM me temporarily rakho, disk pe save mat karo

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/svg+xml"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only SVG files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
});

export default upload;
