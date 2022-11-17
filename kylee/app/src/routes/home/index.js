"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home)
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);


router.get('/homeCook', ctrl.output.homeCook);
router.get('/homeDelivery', ctrl.output.homeDelivery);


router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register); // register경로로 post 명령이 오면 ctrl.process.register 함수가 실행됨



module.exports = router;