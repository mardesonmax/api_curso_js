"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

_dotenv2.default.config();

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

// Iniciando database
require('./database');

const whiteList = [
  'http://project.school.s3-website-sa-east-1.amazonaws.com',
];

const corsOption = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};

const app = _express2.default.call(void 0, );

// middlewares
app.use(_cors2.default.call(void 0, corsOption));
app.use(_helmet2.default.call(void 0, ));
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads')));

// routes
app.use(_routes2.default);

exports. default = app;
