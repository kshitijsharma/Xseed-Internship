const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const Twit = require('twit'); 
const config = require('./config')	 

const app=express()
const port=process.env.PORT || 3000

const pd=path.join(__dirname,'../public')
const vd=path.join(__dirname,'../views')
var searchkey=''
app.set('views',vd)
app.engine('html', require('ejs').renderFile);
app.set('view engine','html')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(pd))

app.get('',(req,res)=>{
        res.render('index')
})


app.get('/getTweets', (req,res)=>{	 
  var T = new Twit(config); 	
  var params = { q: searchkey, count: 10 } 
  T.get('search/tweets', params,searchedData);  
  function searchedData(err, data, response) 
  {
    var temp=[]
	  for(var i=0;i<10;i++)
	  {
    if(!data.statuses){
      continue
    }
    temp.push(data.statuses[i].text);
    }
    console.log(temp)
    res.send(temp)
	}
})

app.get('/displayTweets',(req,res)=>{
  searchkey=req.query.key
  res.render('display')
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

	
  


