var express = require('express');
import { Request, Response } from 'express';
import { QUERY_VALIDATION_REGEX, WIKIPEDIA_API } from '../constants/url';
import { WikiPageModel } from '../models/wiki-page.model';

var router = express.Router();

router.get('/', function (req: Request, res: Response) {
    const { query, limit } = req.query;
    try {
      if(!QUERY_VALIDATION_REGEX.test(query as string)) {
        res.status(500).send({ errors: ['Invalid query text'], errorCode: 500, time: Date.now() });
        return;
      }

      const url = `${WIKIPEDIA_API}?q=${query}&limit=${limit}`
      fetch(url).then(result => {
        result.json().then(data => {
          const wikis = (data?.pages || []).map((wiki: any) => (new WikiPageModel(wiki.id, wiki.title)));
          res.send(wikis);
        });
      }).catch(error => {
        console.log(error);
        res.status(500).send({ errors: [error], errorCode: 500, time: Date.now() });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: [error], errorCode: 500, time: Date.now() });
    }
});

module.exports = router;
