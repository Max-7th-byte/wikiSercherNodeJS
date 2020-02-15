const queue = require('./queue.js').Exported;
const data = new Map();
const wikiLink = 'https://en.wikipedia.org';
const fetch = require('node-fetch');

async function scanWebsiteForLinksFixedSize(path, maximumQuantity) {

    queue.add(path);

    while (!queue.isEmpty()) {

            var sites = []; 
            var element = 0; 
        
        if (maximumQuantity <= 0) {

            const myJson = {};
            myJson.myMap = mapToObject(data);
            const json = JSON.stringify(myJson);

            return json;
        }

        var notInMap = true;
        if (data.has(queue.element())) {
            queue.extract();
            notInMap = false;
        }
        if (notInMap) {

            const sourceCode = await getSourceCode(queue.element());
            
            var linksSourceCode = [];
            linksSourceCode = getWikiLinks(sourceCode);

            var notInTheList = true;

            for (let i = 0; i < linksSourceCode.length; i++) {
                for (let j = 0; j < data.size; j++) {
                    if (linksSourceCode[i] == data[j]) {
                        notInTheList = false;
                        break;
                    }
                }
                if (notInTheList) {
                    sites[element++] = linksSourceCode[i];
                    queue.add(linksSourceCode[i]);
                }
            }
            data.set(queue.element(), sites);
            queue.extract();
            maximumQuantity--;
            sites = [];
            element = 0;
        }
        
    }  
} 

async function getSourceCode(pathName) {

    const z = await fetch(wikiLink + pathName)
        .then(response => response.text());
        return await z;
}

function getWikiLinks(sourceCode) {
    var links = [];
    var count = 0;
    const reg = new RegExp('<a href=\\"(/wiki/[a-zA-Z0-9-_:.#()]+)\\"(\\s+\\w+=\\"[a-zA-Z0-9 ]+\\")*>([a-zA-Z0-9-_]+</a>)', 'g');
    var matched;
    while ((matched = reg.exec(sourceCode)) != null) {
        links[count++] = matched[1];
    }
    console.log(links.length);
    return links;

}

function mapToObject(data) {
    const obj = {}
  for (let [k,v] of data)
    obj[k] = v
  return obj
}

module.exports.scanWebsiteForLinksFixedSize = scanWebsiteForLinksFixedSize;

