var bcrypt=require("bcrypt")
var zlib = require('zlib');
var Blowfish = require('egoroof-blowfish');
var zlibjs=require('zlibjs')

function atob(str){
    return (new Buffer(str, 'base64')).toString()
}

function btoa(str){
    return (new Buffer(str)).toString('base64')
}

function string2Bin(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i).toString(2));
    }
    return result;
}

function bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i], 2));
    }
    return result;
}

function uint8Array2String(array){
    return btoa(String.fromCharCode.apply(null, array));
}

function string2Uint8Array(str){
    var u8_2 = new Uint8Array(atob(str).split("").map(function(c) {
        return c.charCodeAt(0); }));
    return u8_2;
}


var gqbcrypt={}
gqbcrypt.hash=function(o,cb) {
    o.saltRounds = o.saltRounds||10;
    o.input= o.input||""
    bcrypt.genSalt(o.saltRounds, function (err, salt) {
        bcrypt.hash(o.input, salt, cb);
    });
};

gqbcrypt.compare=function(o,cb){
    bcrypt.compare(o.input, o.hash, cb)
};

var zip={};

zip.compress=function(o){
    return zlibjs.gzipSync(Buffer.from(o.input,'utf8')).toString('base64');
};

zip.uncompress=function(o){
    return zlibjs.gunzipSync(Buffer.from(o.input,'base64')).toString();
};

var blowfish={};
blowfish.encrypt=function(o,cb){
    o.secret= o.secret||"secret";
    o.iv= o.iv||"abcdefgh";
    var bf = new Blowfish(o.secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
    bf.setIv(o.iv); // optional for ECB mode; bytes length should be equal 8
    var encoded = bf.encode(o.input);
    encoded=new Buffer(encoded).toString("base64");
    cb(null,encoded);
};

blowfish.decrypt=function(o,cb){
    o.secret= o.secret||"secret";
    o.iv= o.iv||"abcdefgh";
    var bf = new Blowfish(o.secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
    bf.setIv(o.iv); // optional for ECB mode; bytes length should be equal 8
    var decoded = bf.decode(new Buffer(o.input,"base64"), Blowfish.TYPE.STRING); // type is optional
    cb(null,decoded);
};

exports.bcrypt=gqbcrypt;
exports.zip=zip;
exports.blowfish=blowfish;