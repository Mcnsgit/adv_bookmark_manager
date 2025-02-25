const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET,
        { expiresIn: '1h', algorithm: 'HS256' }
    );
}

const authResponse = (user) => ({
    token: generateToken(user.id),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      preferences: user.preferences
    }
});
  

  module.exports = {
    generateToken,
    authResponse
  };