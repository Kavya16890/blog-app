const mongoose = require('mongoose')

const DBConnect = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch(err){
        console.error('MongoDB connect failed.', err)
    }
}

module.exports = DBConnect;