/* A stub of a datastore. Simply override these two functions 
    to provide a real history. Should put session management 
    in the interface if it's exposed to a public network 
*/

const dataStore = {};

function getLastEntry(key) {
    return dataStore[key];
}

function setEntry(key, value) {
    dataStore[key] = value;
}

exports.getLastEntry = getLastEntry;
exports.setEntry = setEntry;