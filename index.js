var bcrypt=require("bcrypt")
var zlib = require('zlib');
var Blowfish = require('egoroof-blowfish');

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
zip.compress= function(o,cb) {
    zlib.deflate(o.input, function (err, buffer) {
        if (!err) {
            cb(null,buffer.toString('base64'));
        } else {
            cb(err);
        }
    });
};

zip.uncompress= function(o,cb) {
    var buffer = Buffer.from(o.input, 'base64');
    zlib.unzip(buffer, function (err, buffer){
        if (!err) {
            cb(null,buffer.toString());
        } else {
            cb(err);
        }
    });
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

exports.bcrypt=gqbcrypt
exports.zip=zip
exports.blowfish=blowfish