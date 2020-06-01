var express = require('express');
var router = express.Router();
const model = require('./../model')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.post('/regist', (req, res, next)=> {
  const {username,password,password2} = req.body
  const data = {username,password,password2}
  // 数据校验
  model.connect(db=>[
    db.collection('users').insertOne(data,(err,ret)=>{
     if(err){
       console.log('注册失败')
       res.redirect('/regist')
     }else{
       res.redirect('/login')
     }
    })
  ])
});
router.post('/login',(req,res,next)=>{
  const {username,password} = req.body
  const data = {username,password}
  // 数据校验
  model.connect(db=>{
    db.collection('users').find(data).toArray((err,docs)=>{
      if(err){
        console.log('登录失败')
        res.redirect('/login')
      }else{
        if(docs.length > 0){
          req.session.username = data.username
          res.redirect('/')
        }else{
          console.log('用户不存在')
          res.redirect('/login')
        }
      }
    })
    })
})

router.get('/logout',(req,res,next)=>{
  req.session.username = null
  res.redirect('/login')
})
module.exports = router;
