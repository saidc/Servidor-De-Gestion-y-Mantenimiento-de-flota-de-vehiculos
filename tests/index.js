const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res)=>{
  res.send('Hello World');
})
 
app.listen(PORT,()=> console.log(`Listening on ${PORT}\nlink:\n
http://127.0.0.1:${PORT}/  \n OR \n 
http://localhost:${PORT}/`));