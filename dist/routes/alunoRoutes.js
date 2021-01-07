"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoCotroller = require('../controllers/AlunoCotroller'); var _AlunoCotroller2 = _interopRequireDefault(_AlunoCotroller);

var _loginVerify = require('../middlewares/loginVerify'); var _loginVerify2 = _interopRequireDefault(_loginVerify);

const router = new (0, _express.Router)();

router.get('/', _AlunoCotroller2.default.index);
router.get('/show/:id', _AlunoCotroller2.default.show);
router.post('/store', _loginVerify2.default, _AlunoCotroller2.default.store);
router.put('/update/:id', _loginVerify2.default, _AlunoCotroller2.default.update);
router.delete('/delete/:id', _loginVerify2.default, _AlunoCotroller2.default.delete);

exports. default = router;
