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

//////////////////////////////////////////////// 👷 GET YOUR CUSTOM SCARPER
/*

                  𝕴 𝖈𝖆𝖓 𝖒𝖆𝖉𝖊 𝖆 𝖈𝖚𝖘𝖙𝖔𝖒 𝖜𝖊𝖇 𝖘𝖈𝖗𝖆𝖕𝖊𝖗
                  𝕗𝕠𝕣 𝕪𝕠𝕦 𝕒𝕥 𝕧𝕖𝕣𝕪 𝕣𝕖𝕒𝕤𝕠𝕟𝕒𝕓𝕝𝕖 𝕣𝕒𝕥𝕖
           ｙｏｕ ｃａｎ ｃｏｎｔａｃｔ ｍｅ ｏｎ ｄｉｓｃｏｒｄ
       <@752769834550558763> put this any discord channel and dm me

*/
//////////////////////////////////////////////// API RULES

var whitelist = ['http://example1.com', 'http://127.0.0.1:5500', 'http://cms.weeb.eu.org','https://cms.weeb.eu.org','https://an.weeb.eu.org','http://an.weeb.eu.org']
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
app.get('/',cors(corsOptionsDelegate), (req, res) => {
    res.send(` VidCloudApi📺 <br>
    <p>Made By https://github.com/healer-op</p>
    <hr>
    🧯Recent : /v <br>
    >>>>>>>>>Example : <a href="/v">Click Me</a> <br>
    🧯TvSeries : /v/series <br>
    >>>>>>>>>Example : <a href="/v/series">Click Me</a> <br>
    🧯Cinema : /v/cinema <br>
    >>>>>>>>>Example : <a href="/v/cinema">Click Me</a> <br>
    🧯Search : /v/search/:searchterm <br>
    >>>>>>>>>Example : <a href="/v/search/james">Click Me</a> <br>
    🧯VideoLink : /v/video/:li <br>
    >>>>>>>>>Example : <a href="v/video/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=">Click Me</a> <br>
    🧯Related : /v/related/:li <br>
    >>>>>>>>>Example : <a href="/v/related/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=">Click Me</a> <br>
    <hr>
    <p>🔴Note** : li = bash64 encode link of vidcloud for example<br>
    for example : /v/video/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=<br>
    Go to https://www.base64encode.org/ an type this (aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=<br>
    You Will Understand Everything</p>
`)
})

/////////////////////////////////////////////  RECENT ON VIDCLOUD

app.get('/v',cors(corsOptionsDelegate), (req, res) => {
    var data={};
    data.name = "👷VidCloud Recent";
    data.author = "🌟healer-op";
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`${domain}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-6.col-xs-6.item.responsive-height.post').each((i,element) =>{
            
            const link = $(element).find('h3').find('a').attr('href')
            data.links.push(link);
            const title = $(element).find('h3').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img);
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD TV SERIES

app.get('/v/series',cors(corsOptionsDelegate), (req, res) => {
    var data={};
    data.name = "👷VidCloud Series";
    data.author = "🌟healer-op";
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`${domain}/series`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-6.col-xs-6.item.responsive-height.post').each((i,element) =>{
            
            const link = $(element).find('h3').find('a').attr('href')
            data.links.push(link);
            const title = $(element).find('h3').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img);
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD CINEMA

app.get('/v/cinema',cors(corsOptionsDelegate), (req, res) => {
    var data={};
    data.name = "👷VidCloud Cinema";
    data.author = "🌟healer-op";
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`${domain}/cinema-movies`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-6.col-xs-6.item.responsive-height.post').each((i,element) =>{
            
            const link = $(element).find('h3').find('a').attr('href')
            data.links.push(link);
            const title = $(element).find('h3').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img);
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD SEARCH

app.get('/v/search/:searchterm',cors(corsOptionsDelegate), (req, res) => {
    var li = req.params.searchterm;
    var data={};
    data.name = "👷VidCloud Search";
    data.author = "🌟healer-op";
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`${domain}/?s=${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.item.responsive-height.col-md-4.col-sm-6.col-xs-6').each((i,element) =>{
            
            const link = $(element).find('h3').find('a').attr('href')
            data.links.push(link);
            const title = $(element).find('h3').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img);
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD VIDEO LINK

app.get('/v/video/:li',cors(corsOptionsDelegate), async (req, res) => {
    var li = req.params.li;
    var lis = Buffer.from(li, 'base64').toString('ascii')  


    // 🔴 Note** Have to pass bash64 encode link like 
    // for example : /v/video/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=
    // Go to https://www.base64encode.org/ an type this (aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=)
    // You Will Understand Everything


    var data={};
    data.name = "👷VidCloud VideoLink";
    data.author = "🌟healer-op";
    data.links = [];
    
        axios.get(`${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('iframe').each((i,element) =>{
            
            const link = $(element).attr('src')
            data.links.push(link.trim());
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

////////////////////////////////////////////////////////////// VID CLOUD VIDEO RELATED

app.get('/v/related/:li', cors(corsOptionsDelegate), (req, res) => {
    var li = req.params.li;
    var lis = Buffer.from(li, 'base64').toString('ascii')

    // 🔴 Note** Have to pass bash64 encode link like 
    // for example : /v/related/aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=
    // Go to https://www.base64encode.org/ an type this (aHR0cHM6Ly92aWRjbG91ZC51bm8vdmlkZW8vYml0Y2hpbi10aGUtc291bmQtYW5kLWZ1cnktb2Ytcmljay1qYW1lcy8=)
    // You Will Understand Everything

    var data={};
    data.name = "👷VidCloud Related";
    data.author = "🌟healer-op";
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.col-md-2.col-sm-2.col-xs-12.item.responsive-height').each((i,element) =>{
            
            const link = $(element).find('h3').find('a').attr('href')
            data.links.push(link);
            const title = $(element).find('h3').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img);
            
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
