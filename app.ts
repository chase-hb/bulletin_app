import express from 'express';
const app = express();
const port = 3000;
const theRouter = require ('./routes/index')
const cron = require('node-cron');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/', theRouter);
app.use(express.static(__dirname + '/public'));



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});



