"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);
var _multers3 = require('multer-s3'); var _multers32 = _interopRequireDefault(_multers3);

const storageTypes = {
  local: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      _crypto2.default.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        file.key = `${Date.now()}-${hash.toString('hex')}${_path.extname.call(void 0, file.originalname)}`;

        cb(null, file.key);
      });
    },
  }),

  s3: _multers32.default.call(void 0, {
    s3: new _awssdk2.default.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: _multers32.default.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      _crypto2.default.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        const filename = `${Date.now()}-${hash.toString('hex')}${_path.extname.call(void 0, file.originalname)}`;

        cb(null, filename);
      });
    },
  }),
};

exports. default = {
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
    return cb(new _multer2.default.MulterError('Arquivo não suportado'));
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
