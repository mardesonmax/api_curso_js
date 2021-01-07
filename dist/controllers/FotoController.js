"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');
var _util = require('util');
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

const upload = _multer2.default.call(void 0, _multer4.default).single('foto');

const s3 = new _awssdk2.default.S3();

const deleteImage = async (image) => {
  if (process.env.STORAGE_TYPE === 's3') {
    s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: image,
    }).promise();
  } else {
    const directory = _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images', image);
    await _util.promisify.call(void 0, _fs2.default.unlink)(directory);
  }
};

exports. default = {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname: name, key, location: url = '' } = req.file;
        const { aluno_id } = req.body;

        if (!aluno_id) {
          // Excluir imagem
          deleteImage(key);

          return res.status(400).json({
            errors: ['Selecione um aluno para continuar'],
          });
        }

        const foto = await _Foto2.default.create({
          name, key, aluno_id, url,
        });

        if (!foto) {
          deleteImage(key);
          return res.status(400).json({
            errors: ['Erro ao tentar salvar imagem'],
          });
        }
        return res.json(foto);
      } catch (e) {
        deleteImage(req.file.filename);

        return res.status(400).json({
          errors: ['Alunno não existe'],
        });
      }
    });
  },

  async delete(req, res) {
    const { foto_id } = req.params;
    const foto = await _Foto2.default.findByPk(foto_id);

    if (!foto) {
      return res.status(400).json({
        errors: ['Imagem não encontrada'],
      });
    }

    const resul = await foto.destroy();

    if (!resul) {
      return res.status(400).json({
        errors: ['Erro ao tentar deletar imagem'],
      });
    }

    deleteImage(resul.filename);

    return res.json({
      success: ['Imagem deletada com sucesso'],
    });
  },
};
