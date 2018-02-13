const errors = require('./errors.js');
const dataStore = require('../data_store/data_store');

function History() {
    /* Basic log of history
        calls the `dataStore` interface, which can be swapped out for any 
        data store 
    */
    this.get = function(key) {
        /* Returns a value for key 
            :param str/number key: A hashable ID 
            :error: if not found, throws NotFound:
            :return: anything
        */
        const resp = dataStore.getLastEntry(key);
        console.log('----=- resp ' + resp)
        if (typeof(resp) === 'undefined') {
            throw new errors.NotFound;
        }
        return resp;
    };

    this.set = function(key, value) {
        /* assign $value to the given $key 
            :param str/number key: Any hashable ID
            :param anything value: 
            :return: undefined
        */
        dataStore.setEntry(key, value);
    };
}

exports.History = History;