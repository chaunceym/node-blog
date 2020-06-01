const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'node-blog';

// Use connect method to connect to the server
function connect(callback){
MongoClient.connect(url,{},(err, client)=> {
  if(err){
    console.log('数据库连接失败',err)
  }else{
    console.log('数据库连接成功')
    const db = client.db(dbName);
    callback && callback(db)
  }

  client.close();
});
}

module.exports = { connect }
