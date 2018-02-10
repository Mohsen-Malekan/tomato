'use strict';

import multer from 'multer';
import * as auth from "../../auth/auth.service";

var express    = require('express');
var controller = require('./news.controller');

let upload = multer({dest : 'uploads/'});
var router = express.Router();

router.get('/', controller.index);
router.get('/latest', controller.lates3);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), upload.single('photo'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.patch('/:id', auth.hasRole('admin'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
