const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/shops', {
    useMongoClient: true,
})
    .then(()=>console.log('Mongodb connected'))
    .catch(err=>console.log(err));
const Schema = mongoose.Schema;

// Create Schema
const shopsSchema = new Schema({
   picture:String,
   name:String,
   email:String,
   city:String,
   location:{
       type:{type :String,default :'Point'},
       coordinates :{type:[Number],index:'2dsphere'}
   }

});
const shops = mongoose.model('shops', shopsSchema);
module.exports =shops;
