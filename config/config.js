 //set enviroment port
 process.env.PORT = process.env.PORT || 5500;

 process.env.ConnectionString =   process.env.ConnectionString  || 'mongodb://localhost:27017/coffeDb';

 process.env.TokenExpireTime = '1h';
 process.env.TokenSecret = process.env.TokenSecret || 'TokenSecret-Dev';


 process.env.googleClientId = process.env.googleClientId || '82434678121-dot6o4rl7rbfcql30i00kvrp1ol8nkvg.apps.googleusercontent.com'
 process.env.googleSecret = process.env.googleSecret || 'MZuUoQ51u7xmf7dsPA1rBRFB'
 

  