"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    try {
        res.send(' Search API is working ');
    }
    catch (error) {
        res.status(500).send({ errors: [error], errorCode: 500, time: Date.now() });
    }
});
module.exports = router;
