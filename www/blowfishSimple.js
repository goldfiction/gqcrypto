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

var blowfish={};
blowfish.encrypt=function(o){
    o.secret= o.secret||"secret";
    o.iv= o.iv||"abcdefgh";
    var bf = new Blowfish(o.secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
    bf.setIv(o.iv); // optional for ECB mode; bytes length should be equal 8
    var encoded = bf.encode(o.input);
    return uint8Array2String(encoded);
};

blowfish.decrypt=function(o){
    o.secret= o.secret||"secret";
    o.iv= o.iv||"abcdefgh";
    var bf = new Blowfish(o.secret, Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
    bf.setIv(o.iv); // optional for ECB mode; bytes length should be equal 8
    var decoded = bf.decode(string2Uint8Array(o.input), Blowfish.TYPE.STRING); // type is optional
    return decoded.toString();
};

var zip={}
zip.compress=function(o){
    var deflate = new Zlib.RawDeflate(string2Uint8Array(o.input));
    var compressed = deflate.compress();
    return uint8Array2String(compressed);
};

zip.uncompress=function(o){
    var unzip = new Zlib.RawInflate(string2Uint8Array(o.input));
    var plain = unzip.decompress();
    return uint8Array2String(plain);
};
