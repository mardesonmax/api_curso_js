"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = {
  // Store
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, nome, email } = newUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },

  // Index
  async index(req, res) {
    try {
      console.log(req.userInfo);
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  },

  // Show
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userInfo.id);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  },

  // Update
  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userInfo.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const newData = await user.update(req.body);
      const { id, nome, email } = newData;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },

  // Delete
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userInfo.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();

      return res.status(200).json({
        success: ['Usuário excluído com sucesso.'],
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
