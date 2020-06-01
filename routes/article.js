var express = require('express');
var router = express.Router();
const model = require('./../model')

router.post('/new', (req, res, next) => {
  const {title, content, createAt, page} = req.body
  if(createAt){
    model.connect(db=>{
      db.collection('articles').updateOne({createAt:parseInt(createAt)},{$set:{title,content}},(err,result)=>{
        if(err){
          console.log('修改失败')
        }else{
          res.redirect(`/?page=${page}`)
        }
      })
    })
  }else{
    const data = {
      title,
      content,
      createAt: Date.now(),
      author: req.session.username
    }
    model.connect(db => {
      db.collection('articles').insertOne(data, (err, docs) => {
        if (err) {
          console.log('文章发布失败')
          res.redirect('/write')
        } else {
          res.redirect('/')
        }
      })
    })
  }
})

router.get('/delete', (req, res, next) => {
  const {id, page} = req.query
  model.connect(db => {
    // 注意类型，url 上永远传出来的是字符串，但是 createAt 的是数字
    db.collection('articles').deleteOne({createAt: parseInt(id)}, (err, result) => {
      if (err) {
        console.log('删除失败')
      } else {
        console.log('删除成功')
      }
      res.redirect(`/?page=${page}`)
    })
  })
})
module.exports = router;
