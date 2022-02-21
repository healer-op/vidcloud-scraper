const cheerio = require("cheerio");
const axios = require("axios");
const express = require('express')
const cors = require('cors')
const app = express()


var domain = "https://vidcloud.uno"  

//🔴Note
// https://vidcloud.uno/ ❌
// https://vidcloud.uno  ✅

//  no extra (/) please

const port = 3000

var whitelist = [`https://localhost:3000`,`http://localhost:3000`]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

///////////////////////////////////////////// MADE BY HEALER

///////////////////////////////////////////// HOME PAGE
app.get('/api',cors(corsOptionsDelegate), (req, res) => {

    res.send(` VidCloudApi📺 <br>
    <p>Made By https://github.com/healer-op</p>
    <hr>
    🧯Recent : /v <br>
    >>>>>>>>>Example : <a href="/api/recent">Click Me</a> <br>
    🧯TvSeries : /v/series <br>
    >>>>>>>>>Example : <a href="/api/series">Click Me</a> <br>
    🧯Cinema : /v/cinema <br>
    >>>>>>>>>Example : <a href="/api/cinema">Click Me</a> <br>
    🧯Search : /v/search/:searchterm <br>
    >>>>>>>>>Example : <a href="/api/search/james">Click Me</a> <br>
    🧯VideoLink : /v/video/:li <br>
    >>>>>>>>>Example : <a href="/api/video/the-ice-age-adventures-of-buck-wild/">Click Me</a> <br>
    🧯Related : /v/related/:li <br>
    >>>>>>>>>Example : <a href="/api/related/the-ice-age-adventures-of-buck-wild/">Click Me</a> <br>
    <hr>
`)
})

/////////////////////////////////////////////  RECENT ON VIDCLOUD

app.get('/api/recent',cors(corsOptionsDelegate), (req, res) => {
    var data=[];
    
    axios.get(`${domain}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-6.col-xs-6.item.responsive-height.post').each((i,element) =>{
            data.push({
                link: $(element).find('h3').find('a').attr('href').split(`${domain}/video/`)[1],
                title: $(element).find('h3').text(),
                img: $(element).find('img').attr('src')  
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD TV SERIES

app.get('/api/series',cors(corsOptionsDelegate), (req, res) => {
    var data=[];
    
    axios.get(`${domain}/series`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-6.col-xs-6.item.responsive-height.post').each((i,element) =>{
            data.push({
                link: $(element).find('h3').find('a').attr('href').split(`${domain}/video/`)[1],
                
                title: $(element).find('h3').text(),

                img: $(element).find('img').attr('src')

            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD CINEMA

app.get('/api/cinema',cors(corsOptionsDelegate), (req, res) => {
    var data=[];
    
    axios.get(`${domain}/cinema-movies`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-6.col-xs-6.item.responsive-height.post').each((i,element) =>{
            data.push({
            link: $(element).find('h3').find('a').attr('href').split(`${domain}/video/`)[1],
            title:  $(element).find('h3').text(),
            img: $(element).find('img').attr('src')
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD SEARCH

app.get('/api/search/:searchterm',cors(corsOptionsDelegate), (req, res) => {
    var li = req.params.searchterm;
    var data=[];
    
    axios.get(`${domain}/?s=${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.item.responsive-height.col-md-4.col-sm-6.col-xs-6').each((i,element) =>{
            data.push({
                link: $(element).find('h3').find('a').attr('href').split(`${domain}/video/`)[1],
                title: $(element).find('h3').text(),
                img: $(element).find('img').attr('src')
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD VIDEO LINK

app.get('/api/video/:li',cors(corsOptionsDelegate), async (req, res) => {
    var li = req.params.li;
    var lis = li;


    // 🔴 Note** Have to pass bash64 encode link like 
    // for example : /v/video/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=
    // Go to https://www.base64encode.org/ an type this (aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=)
    // You Will Understand Everything


    var data=[];
    
        axios.get(`${domain}/video/${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('iframe').each((i,element) =>{
            data.push({
                link: $(element).attr('src')
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD VIDEO RELATED

app.get('/api/related/:li', cors(corsOptionsDelegate), (req, res) => {
    var li = req.params.li;
    var lis = li;

    // 🔴 Note** Have to pass bash64 encode link like 
    // for example : /v/related/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=
    // Go to https://www.base64encode.org/ an type this (aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=)
    // You Will Understand Everything

    var data=[];
    
    axios.get(`${domain}/video/${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-2.col-xs-12.item.responsive-height').each((i,element) =>{
            data.push({
                link: $(element).find('h3').find('a').attr('href').split(`${domain}/video/`)[1],
                title: $(element).find('h3').text(),
                img: $(element).find('img').attr('src')
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// THANKS FOR USING API

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('MADE BY HEALER')
  })
