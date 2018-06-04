//var bcrypt=require("bcrypt")
//var zlib = require('zlib');
//var Blowfish = require('egoroof-blowfish');

//function bcryptTest(){
//    var input="0123456789";
//    blowfish({input:input},function(err,hash1){
//        blowfish({input:input},function(err,hash2){
//            console.log(hash1)
//            console.log(hash2)
//            bcrypt.compare(input,hash1,function(e,res){
//                console.log(res)
//                bcrypt.compare(input,hash2,function(e,res){
//                    console.log(res)
//                    bcrypt.compare(input+"x",hash1,function(e,res){
//                        console.log(res)
//                    })
//                })
//            })
//        })
//    })
//
//}
//bcryptTest()
//
//function zlibTest(){
//    var input = '01234567890123456789'
//    zlib.deflate(input, function (err, buffer){
//        if (!err) {
//            console.log(buffer.toString('base64'));
//        } else {
//            // handle error
//        }
//    });
//
//    var buffer = Buffer.from('eJwzMDQyNjE1M7ewNICzACqABBs=', 'base64');
//    zlib.unzip(buffer, function (err, buffer){
//        if (!err) {
//            console.log(buffer.toString());
//        } else {
//            // handle error
//        }
//    });
//}
//zlibTest()
//
//function blowfishTest(){
//    var bf = new Blowfish('secret', Blowfish.MODE.ECB, Blowfish.PADDING.NULL); // only key isn't optional
//    bf.setIv('abcdefgh'); // optional for ECB mode; bytes length should be equal 8
//    var input='input text even with emoji ?'
//    var encoded = bf.encode(input);
//    encoded=new Buffer(encoded).toString("base64")
//    var decoded = bf.decode(new Buffer(encoded,"base64"), Blowfish.TYPE.STRING); // type is optional
//    console.log(input)
//    console.log(encoded)
//    console.log(decoded)
//}
//
//blowfishTest()