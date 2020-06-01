var express = require('express');
var router = express.Router();
const model = require('./../model')

router.post('/new',(req,res,next)=>{
  const {title,content} = req.body
  const data = {
    title,
    content,
    createAt:Date.now(),
    author:req.session.username
  }
  model.connect(db=>{
    db.collection('articles').insertOne(data,(err,docs)=>{
      if(err) {
        console.log('文章发布失败')
        res.redirect('/write')
      }else{
        res.redirect('/')
      }
    })
  })
})

module.exports = router;
