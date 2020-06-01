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
              if(data2.length === 0){
                res.redirect(`/?page=${(paging.currentPage-1) || 1}`)
              }else{
                paging.list = data2
              }
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
  const {id,page} = req.query
  let articleInfo = {}
  if(id){
    model.connect(db=>{
      db.collection('articles').findOne({createAt:parseInt(id)},(err,result)=>{
        if(err){
          console.log('查询失败')
          console.log(err)
        }else{
          articleInfo = result
          articleInfo.page = page
          res.render('write',{articleInfo});
        }
      })
    })
  }else{
    res.render('write');
  }

});

module.exports = router;
