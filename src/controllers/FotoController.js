import multer from 'multer';
import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import aws from 'aws-sdk';

import Foto from '../models/Foto';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('foto');

const s3 = new aws.S3();

const deleteImage = async (image) => {
  if (process.env.STORAGE_TYPE === 's3') {
    s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: image,
    }).promise();
  } else {
    const directory = resolve(__dirname, '..', '..', 'uploads', 'images', image);
    await promisify(fs.unlink)(directory);
  }
};

export default {
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

        const foto = await Foto.create({
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
    const foto = await Foto.findByPk(foto_id);

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
