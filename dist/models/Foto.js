"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Foto extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo foto não pode ficar vazio',
          },
        },
      },
      key: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo foto não pode ficar vazio',
          },
        },
      },
      url: {
        type: _sequelize2.default.STRING,
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
} exports.default = Foto;
