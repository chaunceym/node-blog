var express = require('express');
var router = express.Router();
const model = require('./../model')

/* GET home page. */
router.get('/', function (req, res, next) {
  const username = req.session.username
  const clientCurrentPage = req.query.page || 1
  const paging = {
    total: 0,
    currentPage: clientCurrentPage,
    list: []
  }
  const pageSize = 5
  model.connect((db) => {
    db.collection('articles').find().toArray((err, data) => {
      paging.total = Math.ceil(data.length / pageSize)
      model.connect(db => {
        db.collection('articles')
          .find()
          .sort({_id: -1})
          .limit(pageSize)
          .skip((paging.currentPage - 1) * pageSize)
          .toArray((err, data2) => {
            if(err){
              console.log(err)
            }else{
              paging.list = data2
              res.render('index', {username, paging});
            }
          })
      })
    })
  })
});

router.get('/regist', (req, res, next) => {
  res.render('regist');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});
router.get('/write', (req, res, next) => {
  res.render('write');
});

module.exports = router;
