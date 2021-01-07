import User from '../models/User';

export default {
  // Store
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
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
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  },

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userInfo.id);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  },

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userInfo.id);

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
      const user = await User.findByPk(req.userInfo.id);

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
