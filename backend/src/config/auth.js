const authConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
};
  
  if (!authConfig.secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  if (!authConfig.expiresIn) {
    throw new Error('JWT_EXPIRES_IN is not defined');
  }
  


module.exports = authConfig;