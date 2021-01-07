"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['E-mail ou/e Senha inválidos'],
        });
      }

      const user = await _User2.default.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.passwordVerify(password))) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const { id } = user;

      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token, user: { id, nome: user.nome, email } });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
