const express = require('express'),
      server = express(),
      urlConverter = require('./urlConverter'),
      bodyParser = require('body-parser');

//setting the port.
server.set('port', process.env.PORT || 3000);

//Adding routes
server.get('/',(request,response)=>{
 response.sendFile(__dirname + '/index.html');
});

server.use(express.static(__dirname + '/public'));

server.use(bodyParser.urlencoded({
   extended: false
}));

server.use(bodyParser.json());

server.get('/urlConverter', (request,response)=>{
 response.render('form');
 response.sendFile('index.html');
});

server.post('/urlConverter', async (request, response) => {
    let link = request.body.link;
    let toReturn = await urlConverter.scanWebsiteForLinksFixedSize(link, 2);
    response.send(toReturn.toString());
});

server.listen(3000,()=>{
 console.log('Express server started at port 3000');
});