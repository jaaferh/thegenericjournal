const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ // multer settings
  storage,
}).single('file');

// set up Cloudinary
cloudinary.config({
  cloud_name: 'soqudu',
  api_key: '198138187641697',
  api_secret: 'o5jfC8Ix59MA4LZY_KLuq0JfgAw',
});

exports.photo_upload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) { return next(err); }
    if (req.file) {
      return cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
        if (error) { return next(error); }
        const imageUrl = result.url;
        return res.send(imageUrl);
      }).end(req.file.buffer);
    }
    return res.status(400);
  });
};
