const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;


const autenticarJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    jwt.verify(token, jwtSecret, (err, usuario) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      req.usuario = usuario;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token no proporcionado' });
  }
};

const autorizarJwt = expressJwt({ secret: jwtSecret, algorithms: ["HS256"] }); 

module.exports = { autenticarJwt, autorizarJwt };