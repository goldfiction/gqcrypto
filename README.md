```
gqcrypto is an easy to use crypto module

It is a wrapper for bcrypt,blowfish and zlib
see below for how ot use gqcrypt

var gqcrypt=require('../index.js')
var assert=require('assert')

var input="01234567890123456789";
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
    var compressed=gqcrypt.zip.compress({input:input})
    var uncompressed=gqcrypt.zip.uncompress({input:compressed})
    console.log(input)
    console.log(compressed)
    console.log(uncompressed)
    assert(input==uncompressed)
    done()
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
<script src="blowfish.js"></script>
<script src="zlib/zlib_and_gzip.min.js"></script>
<script src="zlib/gunzip.min.js"></script>

<script src="blowfishSimple.js"></script>
<script>
    function blowfishTest(){
        var input="01234567890123456789"
        var input2="H4sIAIyeGVsA/0XGJQEAABAEwUrP0L/YynNjHlk9ey8B1bqJ/BQAAAA="

        var encoded=blowfish.encrypt({input:input})
        var decoded=blowfish.decrypt({input:encoded})
        console.log(input)
        console.log(encoded)
        console.log(decoded)
        console.log(input==decoded)
        console.log('----')

        var compressed=zip.compress({input:input})
        var uncompressed=zip.uncompress({input:compressed})
        console.log(input)
        console.log(compressed)
        console.log(uncompressed)
        console.log(input==uncompressed)
        console.log('----')

        var uncompressed2=zip.uncompress({input:input2})
        console.log(atob(uncompressed2))
    }
    blowfishTest()
</script>
</body>
</html>
```