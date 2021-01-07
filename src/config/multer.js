import multer from 'multer';
import { extname, resolve } from 'path';
import crypto from 'crypto';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        file.key = `${Date.now()}-${hash.toString('hex')}${extname(file.originalname)}`;

        cb(null, file.key);
      });
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        const filename = `${Date.now()}-${hash.toString('hex')}${extname(file.originalname)}`;

        cb(null, filename);
      });
    },
  }),
};

export default {
  storage: storageTypes[process.env.STORAGE_TYPE],
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    // Tipos suportados
    const types = [
      'image/png',
      'image/jpeg',
      'image/pjpeg',
      'image/gif',
    ];

    if (types.includes(mimetype)) {
      return cb(null, true);
    }
    return cb(new multer.MulterError('Arquivo não suportado'));
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
