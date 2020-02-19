const queue = require('./queue.js').Exported;
const data = new Map();
const wikiLink = 'https://en.wikipedia.org';
const fetch = require('node-fetch');

async function scanWebsiteForLinksFixedSize(path, maximumQuantity) {

    queue.add(path);

    while (!queue.isEmpty()) {

            let sites = []; 
            let element = 0; 
        
        if (maximumQuantity <= 0) {

            const jsonObj = {};
            jsonObj.mapData = mapToObject(data);
            const json = JSON.stringify(jsonObj).substr(12,);
            
            return json;
        }

        let notInMap = true;
        if (data.has(queue.element())) {
            queue.extract();
            notInMap = false;
        }
        if (notInMap) {

            const sourceCode = await getSourceCode(queue.element());
            
            let linksSourceCode = [];
            linksSourceCode = getWikiLinks(sourceCode);

            let notInTheList = true;

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
    let links = [];
    let count = 0;
    const reg = new RegExp('<a href=\\"(/wiki/[a-zA-Z0-9-_:.#()]+)\\"(\\s+\\w+=\\"[a-zA-Z0-9 ]+\\")*>([a-zA-Z0-9-_]+</a>)', 'g');
    let matched;
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

function ToString(strMap) {

    let node = '';
    const reg = new RegExp('\\"/wiki/[a-zA-Z0-9-_:.#()]+\\":', 'g');
}

module.exports.scanWebsiteForLinksFixedSize = scanWebsiteForLinksFixedSize;

