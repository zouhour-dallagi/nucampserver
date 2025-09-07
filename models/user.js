const mongoose=require('mongoose');
const schema=mongoose.schema;
const userSchema=new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});
module.exports=mongoose.model('User',userSchema);
