const express = require('express');
const router = express.Router();
const request = require('request');

/* GET request for home page */
router.get('/', function(req, res, next) {
  var expireTime = new Date(req.session.cookie.expires) - new Date(); 
  res.render('index', { title: 'Craft Beer Names', sessionID: req.sessionID, sessionExpireTime: expireTime, beersViewed: req.session.views, beerName: null, beerStyle: null, error: null });
});


router.post('/', function (req, res) {
  request('https://www.craftbeernamegenerator.com/api/api.php?type=trained', function (err, response, body) {
    if (req.session.views) {
      req.session.views++
    } else {
        req.session.views = 1
    }
    var expireTime = new Date(req.session.cookie.expires) - new Date();   
    
    if(err){
      res.render('index', {title: req.sessionID, sessionID: req.sessionID, sessionExpireTime: expireTime, beersViewed: req.session.views, beerName: null, beerStyle: null, error: 'Error, please try again'});
    } else {
      var beerInfo = JSON.parse(body)

      if(beerInfo.status != 200){
        res.render('index', {title: req.sessionID, sessionID: req.sessionID, sessionExpireTime: expireTime, beersViewed: req.session.views, beerName: null, beerStyle: null, error: 'Error, please try again'});
      } else {
        res.render('index', {title: req.sessionID, sessionID: req.sessionID, sessionExpireTime: expireTime, beersViewed: req.session.views, beerName: beerInfo.data.name, beerStyle: beerInfo.data.style, error: null});
      }
    }
  });
})

router.get('')

module.exports = router;