function useless(callback) {
    return callback
}

var text = 'Amigo';

assert(
    useless(function(){ return text; }) === text,
    "The useless function works! " + text);
