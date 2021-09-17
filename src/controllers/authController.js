const httpStatus = require('http-status');

const defaultUser = {
  identity: 'lutfailham96@gmail.com',
  password: 'mytens999',
  fullname: 'Ilham L.',
};

const login = async (req, res) => {
  const { identity, password } = req.body;
  if (identity !== defaultUser.identity || password !== defaultUser.password) {
    return res.sendWrapped('Invalid credential.', httpStatus.UNAUTHORIZED);
  }
  return res.sendWrapped('Login success.', httpStatus.OK);
};

const register = async (req, res) => {
  const { email, fullname, password } = req.body;
  return res.sendWrapped({
    email,
    fullname,
    password,
  }, httpStatus.CREATED);
};

module.exports = {
  login,
  register,
};
