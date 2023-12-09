const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

// Middleware untuk mengurai payload JSON
app.use(bodyParser.json());

// Middleware untuk memeriksa header api-key
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  // Ganti 'kunci-rahasia' dengan kunci API yang diinginkan
  if (apiKey === 'YXBwc2Nob29sQDIwMjM=') {
    next();
  } else {
    res.status(200).json({code:403, message: 'Akses Ditolak. Header api-key tidak valid.',data:null });
  }
});

// Route untuk endpoint POST
app.get('/', (req, res) => {
  res.json({ api:"V.1.0",applicarion:"App School",author:"Deni Darmayana" });
});

app.post('/token', (req, res) => {
  if (req.body.username == "appschool" && req.body.password == "Bismillah@2023") {
    const token = jwt.sign({ username: req.body.username, password: req.body.password }, 'YXBwc2Nob29sQDIwMjM=', { expiresIn: '1h' });
    res.json({ code:200,message:"Token successfully generated",data:token });
    
  }else{
    res.json({code:203,message:"The credentials you entered are incorrect",data:null})
  }
  
});

app.get('/pay', (req, res) => {
  const dataBank = [
    {code:13846333,name:"Bank Central Asia"}, 
    {code:44444101, name:"Bank Mandiri"},
    {code:98765235, name:"Bank Rakyat Indonesia"},
    {code:73333,  name:"Bank Ina Perdana"}
    ];
  res.json({code:200,message:"Payment channel is displayed successfully",data:dataBank})
});

app.post('/payment', (req, res) => {
  res.json({code:200,message:"Success",data:req.body})
});

app.post('/inquiry', (req, res) => {
  res.json({code:200,message:"Success",data:req.body})
});
// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
