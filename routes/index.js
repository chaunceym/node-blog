var express = require('express');
var router = express.Router();
const model = require('./../model')

/* GET home page. */
router.get('/', function(req, res, next) {
  model.connect((db)=>{
    db.collection('users').find().toArray((err,data)=>{
      console.log(`用户列表为`,data)
      res.render('index', { title: 'Express' });
    })
  })
});

router.get('/regist', (req, res, next)=> {
    res.render('regist');
});
module.exports = router;
