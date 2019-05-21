const jwt = require('jsonwebtoken');

const AllowAnonimusList = ['','/','/login','/googleLogin'];

let tokenVerify = (req, res, next) => {

    if(AllowAnonimusList.indexOf(req.path) >= 0) 
    {
        return next();
    }

    let token = req.get('Authorization');

    jwt.verify(token, process.env.TokenSecret , (err,  decoded) => {
        if(err){
           return res.status(401).json({
                success: false,
                err: 'Invalid authentication'                 
            });
        }

        req.user = decoded.user;
        next();
    });
    
 };

function permit(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    // return a middleware
    return (request, response, next) => {
      if (request.user && isAllowed(request.user.role))
        next(); // role is allowed, so continue on the next middleware
      else {
        response.status(403).json({message: "Forbidden"}); // user is forbidden
      }
    }
  }


 module.exports = { tokenVerify , permit };