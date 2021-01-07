import Sequelize, { Model } from 'sequelize';

export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo foto não pode ficar vazio',
          },
        },
      },
      key: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo foto não pode ficar vazio',
          },
        },
      },
      url: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
      tableName: 'fotos',
    });

    this.addHook('beforeSave', (foto) => {
      if (!foto.url) {
        foto.url = `${process.env.API_URL}/images/${foto.key}`;
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
