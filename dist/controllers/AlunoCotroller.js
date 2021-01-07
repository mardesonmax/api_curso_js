"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

exports. default = {
  // Visualizar todo os alunos
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: [{
        model: _Foto2.default,
        attributes: ['id', 'name', 'key', 'url'],
      }],
    });
    return res.json(alunos);
  },

  // Visualizar informações do aluno
  async show(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['id', 'name', 'key', 'url'],
        },
      });

      if (!aluno) {
        return res.status(404).json({
          errors: ['Pagina não encontrada'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(404).json({
        errors: ['Pagina não encontrada'],
      });
    }
  },

  // Criar novo aluno
  async store(req, res) {
    try {
      const newAluno = await _Aluno2.default.create(req.body);
      const {
        id, nome, sobrenome, email, idade, peso, altura,
      } = newAluno;
      return res.json({
        id, nome, sobrenome, email, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },

  // Atualizar dados do aluno
  async update(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      const upAluno = await aluno.update(req.body);

      const {
        id, nome, sobrenome, email, idade, peso, altura,
      } = upAluno;

      return res.json({
        id, nome, sobrenome, email, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },

  // Apagar aluno
  async delete(req, res) {
    try {
      const aluno = await _Aluno2.default.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();

      return res.status(200).json({
        success: ['Aluno excluírdo com sucesso'],
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
