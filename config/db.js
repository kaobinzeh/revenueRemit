const mongoose = require('mongoose');
 let mongoUrl = '';

 if (process.env.NODE_ENV === "development") {
   mongoUrl = process.env.MONGO_URI;
 }else{
    mongoUrl = process.env.MONGO_URI_PROD;
 }
 
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI_PROD, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDb Connected: ${conn.connection.host}`);

}

module.exports = connectDB;