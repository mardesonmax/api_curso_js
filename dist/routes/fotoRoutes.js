"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _FotoController = require('../controllers/FotoController'); var _FotoController2 = _interopRequireDefault(_FotoController);

var _loginVerify = require('../middlewares/loginVerify'); var _loginVerify2 = _interopRequireDefault(_loginVerify);

const router = new (0, _express.Router)();

router.post('/', _loginVerify2.default, _FotoController2.default.store);
router.delete('/delete/:foto_id', _loginVerify2.default, _FotoController2.default.delete);

exports. default = router;
