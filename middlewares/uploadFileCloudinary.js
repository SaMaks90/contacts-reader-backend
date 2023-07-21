const cloudinary = require('cloudinary').v2;

const { HttpError } = require('../helpers');

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

const uploadFileCloudinary = async (req, res, next) => {
    try{
        const { _id } = req.user;
        const response = await cloudinary.uploader
            .upload(req.file.path, {
                folder: 'avatars',
                resource_type: 'image',
                public_id: `${_id}_${req.file.originalname}`
            })
            .then(image => req.avatarUrl = image.url)
            .catch((e) => HttpError(400, e.message));
        next();
    }catch (e) {
        console.error(e);
    }

}

module.exports = uploadFileCloudinary;