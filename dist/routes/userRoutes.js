"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginVerify = require('../middlewares/loginVerify'); var _loginVerify2 = _interopRequireDefault(_loginVerify);

const router = new (0, _express.Router)();

// Não deve existir
// router.get('/', userController.index);

router.get('/show', _loginVerify2.default, _UserController2.default.show);
router.post('/store', _UserController2.default.store);
router.put('/update', _loginVerify2.default, _UserController2.default.update);
router.delete('/delete', _loginVerify2.default, _UserController2.default.delete);

exports. default = router;
