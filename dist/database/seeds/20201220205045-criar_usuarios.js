"use strict";const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users', [{
        nome: 'João',
        email: 'joão@email.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        nome: 'Elton',
        email: 'elton@email.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        nome: 'Maria',
        email: 'maria@email.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        nome: 'Marcelo',
        email: 'marcelo@email.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      }], {},
    );
  },

  down: async () => {

  },
};
