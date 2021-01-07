"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _homeController = require('../controllers/homeController'); var _homeController2 = _interopRequireDefault(_homeController);

const router = new (0, _express.Router)();

router.get('/', _homeController2.default.index);

exports. default = router;
