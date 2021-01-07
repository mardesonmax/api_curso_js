import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

export default {
  // Visualizar todo os alunos
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: [{
        model: Foto,
        attributes: ['id', 'name', 'key', 'url'],
      }],
    });
    return res.json(alunos);
  },

  // Visualizar informações do aluno
  async show(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
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
      const newAluno = await Aluno.create(req.body);
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
      const aluno = await Aluno.findByPk(req.params.id);
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
      const aluno = await Aluno.findByPk(req.params.id);
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
