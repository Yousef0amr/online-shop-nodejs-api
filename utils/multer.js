import multer from 'multer'
import ApiError from './apiResponse.js'


const multerConfig = (fileType = 'image') => {

    const storage = multer.memoryStorage({
        destination: (req, file, cb) => {
            cb(null, __basedir + "/assets/uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-product-${file.originalname}`);
        },
    })

    const fileFilter = (req, file, next) => {
        if (file.mimetype.startsWith(fileType)) {
            return next(null, true)
        } else {
            return next(new ApiError(`Only ${fileType} allowed`, 400), false)
        }
    }

    return multer({
        fileFilter,
        storage
    });
}


export default multerConfig



