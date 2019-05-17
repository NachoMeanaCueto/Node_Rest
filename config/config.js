 //set enviroment port
 process.env.PORT = process.env.PORT || 8080;

 process.env.NODE_ENV = process.env.NODE_ENV || "dev";

 process.env.ConnectionString = 'mongodb://localhost:27017/coffeDb';

 if(process.env.NODE_ENV != 'dev'){
    process.env.ConnectionString = 'mongodb+srv://sa:as@cluster0-iuoju.mongodb.net/coffeDb';
 }
 

  