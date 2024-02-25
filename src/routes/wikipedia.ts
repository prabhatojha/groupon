var express = require('express');
import { Request, Response } from 'express';
import { QUERY_VALIDATION_REGEX, WIKIPEDIA_API } from '../constants/url';
import { WikiPageModel } from '../models/wiki-page.model';

var router = express.Router();

/**
 * This route will do the following
 * 1. Validate inputs
 * 2. Make API calls to wikipedia API
 * 3. Model the response to a specific model, to sanitize the response from Wikipedia
 */
router.get('/', function (req: Request, res: Response) {
    const { query, limit } = req.query;
    try {
      if(!QUERY_VALIDATION_REGEX.test(query as string)) {
        sendError('Invalid query text', res);
        return;
      }

      const sanitizedLimit = parseInt(limit as string);
      if(sanitizedLimit < 0 || sanitizedLimit > 500) {
        sendError('Invalid limit, it should be in the range of [1, 500]', res);
        return;
      }

      makeFetchCall(query as string, parseInt(limit as string), res);
    } catch (error) {
      sendError(error, res);
    }
});

function makeFetchCall(query: string, limit: number, res: Response) {
  const url = `${WIKIPEDIA_API}?q=${query}&limit=${limit}`
  fetch(url).then(result => {
    result.json().then(data => {
      const wikis = (data?.pages || []).map((wiki: any) => (new WikiPageModel(wiki.id, wiki.title)));
      res.send(wikis);
    });
  }).catch(error => {
    sendError(error, res);
  });
}

function sendError(error: string, res: Response) {
  console.log(error);
  res.status(500).send({ errors: [error], errorCode: 500, time: Date.now() });
}

module.exports = router;
