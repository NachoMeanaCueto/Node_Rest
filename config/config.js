 //set enviroment port
 process.env.PORT = process.env.PORT || 8080;

 process.env.ConnectionString =   process.env.ConnectionString  || 'mongodb://localhost:27017/coffeDb';

 process.env.TokenExpireTime = '1h';
 process.env.TokenSecret = process.env.TokenSecret || 'TokenSecret-Dev';



 

  