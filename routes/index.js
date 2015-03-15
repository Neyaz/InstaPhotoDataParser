var express = require('express'),
    router = express.Router(),
    request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Insta Photo Parser' });
});

router.post('/', function(req, res) {
      req.assert('url', 'URL is required').notEmpty();
      req.assert('url', "It isn't url").isUrl();

      var mediaId = req.body.url.split('/')[4];
      var accessToken = '1760943707.48f903b.9257e4c836334ac5a7b3e675ee525d4d';

      var errors = req.validationErrors();
      if (errors) {
            res.render('index', {
              title: 'Insta Photo Parser',
              message: 'You Got Errors',
              errors: errors
            });
      } else{
          request('http://api.instagram.com/oembed?url='+req.body.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              request('https://api.instagram.com/v1/media/'+JSON.parse(body)['media_id']+'?access_token='+accessToken, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                      res.render('index', { title: 'Insta Photo Parser', info: JSON.stringify(JSON.parse(body), undefined, 4)});
                    }else{
                      console.log(error);
                    }
                  });
               }else{
                  console.log(error);
            }
          });
      }
});

module.exports = router;
