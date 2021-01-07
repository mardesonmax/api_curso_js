import jwt from 'jsonwebtoken';
import User from '../models/User';

export default {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['E-mail ou/e Senha inválidos'],
        });
      }

      const user = await User.findOne({ where: { email } });

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

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
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
