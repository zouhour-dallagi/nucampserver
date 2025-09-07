const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const schema=mongoose.schema;
const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);
