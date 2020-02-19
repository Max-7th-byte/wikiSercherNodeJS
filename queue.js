
/**
 * 
 * This is a separate data structure -- queue.
 * FIFO type
 * methods: add, extract, print, element
 * 
 */

const links = [];
var Exported = {

    add: function (link) {
        links.push(link);
    },


    extract: function() {
        if (this.isEmpty()) {
            console.log('You have no links left');
        } else return links.shift();
    },

    isEmpty: function() {
        return links.length == 0;
    },

    print: function () {

        for (let i = 0; i < links.length; i++) {
            console.log(links[i]);
        }
    },

    element: function() {
        return links[0];
    }
}

module.exports.Exported = Exported;