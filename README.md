```
gqcrypto is an easy to use crypto module

It is a wrapper for bcrypt,blowfish and zlib
see below for how ot use gqcrypt

var gqcrypt=require('../index.js')
var assert=require('assert')

var input="0123456789";
it("should be able to hash password using bcrypt",function(done){
    gqcrypt.bcrypt.hash({input:input},function(e1,hash){
        gqcrypt.bcrypt.compare({input:input,hash:hash},function(e2,result){
            console.log(input)
            console.log(hash)
            console.log(result)
            assert(result)
            done(e1||e2)
        })
    })
});

it("should be able to zlib zip string",function(done){
    gqcrypt.zip.compress({input:input},function(e1,compressed){
        gqcrypt.zip.uncompress({input:compressed},function(e2,uncompressed){
            console.log(input)
            console.log(compressed)
            console.log(uncompressed)
            assert(input==uncompressed)
            done(e1||e2)
        })
    })
});

it("should be able to encrypt using blowfish",function(done){
    gqcrypt.blowfish.encrypt({input:input},function(e1,encrypted){
        gqcrypt.blowfish.decrypt({input:encrypted},function(e2,decrypted){
            console.log(input)
            console.log(encrypted)
            console.log(decrypted)
            assert(input==decrypted)
            done(e1||e2)
        })
    })
})

Also included are browser counter parts stored in www folder

<html>
<body>
<script src="blowfish.js"></script>  // from egoroof's blowfish: https://github.com/egoroof/blowfish
<script src="zlib/zlib_and_gzip.min.js"></script>  // from maya's zlib: https://github.com/imaya/zlib.js/blob/develop/README.en.md
<script src="zlib/rawinflate.min.js"></script>
<script src="zlib/rawdeflate.min.js"></script>

<script src="blowfishSimple.js"></script>
<script>
    function blowfishTest(){
        var input="01234567890123456789"
        var encoded=blowfish.encrypt({input:input})
        var decoded=blowfish.decrypt({input:encoded})
        console.log(input)
        console.log(encoded)
        console.log(decoded)
        console.log(input==decoded)
        var compressed=zip.compress({input:input})
        var uncompressed=zip.uncompress({input:compressed})
        console.log(compressed)
        console.log(uncompressed)
    }
    blowfishTest()
</script>
</body>
</html>

```