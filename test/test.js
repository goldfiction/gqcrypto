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