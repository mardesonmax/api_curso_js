"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

// import homeRoutes from './src/routes/homeRoutes';
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);

const router = new (0, _express.Router)();

// app.use('/home', homeRoutes);
router.use('/users', _userRoutes2.default);
router.use('/tokens', _tokenRoutes2.default);
router.use('/alunos', _alunoRoutes2.default);
router.use('/fotos', _fotoRoutes2.default);

exports. default = router;
