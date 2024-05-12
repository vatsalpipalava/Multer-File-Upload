import multer from "multer";
// import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        // return cb(null, file.originalname);
        const uniqueSuffix = Date.now() + '-' + file.fieldname + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

export const upload = multer({
    storage: storage,
});
