"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var url_1 = require("../constants/url");
var wiki_page_model_1 = require("../models/wiki-page.model");
var router = express.Router();
router.get('/', function (req, res) {
    var _a = req.query, query = _a.query, limit = _a.limit;
    try {
        if (!url_1.QUERY_VALIDATION_REGEX.test(query)) {
            res.status(500).send({ errors: ['Invalid query text'], errorCode: 500, time: Date.now() });
            return;
        }
        var url = "".concat(url_1.WIKIPEDIA_API, "?q=").concat(query, "&limit=").concat(limit);
        fetch(url).then(function (result) {
            result.json().then(function (data) {
                var wikis = ((data === null || data === void 0 ? void 0 : data.pages) || []).map(function (wiki) { return (new wiki_page_model_1.WikiPageModel(wiki.id, wiki.title)); });
                res.send(wikis);
            });
        }).catch(function (error) {
            console.log(error);
            res.status(500).send({ errors: [error], errorCode: 500, time: Date.now() });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ errors: [error], errorCode: 500, time: Date.now() });
    }
});
module.exports = router;
