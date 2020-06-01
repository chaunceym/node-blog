var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.post('/regist', (req, res, next)=> {
  console.log(req.body.password2)
  console.log(req.body)
  const {username,password,password2} = req.body
  const data = {username,password,password2}
  res.send(data);
});

module.exports = router;
