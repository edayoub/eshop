const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/user', {
    useMongoClient: true,
})
    .then(()=>console.log('Mongodb connected'))
    .catch(err=>console.log(err));
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('users', UserSchema);
module.exports =User;
