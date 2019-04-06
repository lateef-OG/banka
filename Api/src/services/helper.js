import jwt from 'jsonwebtoken';

require('dotenv').config();

const Helper = {
  isEmailValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  validateUser(user) {
    const {
      email, firstName, lastName, password, type, isAdmin,
    } = user;
    let errors = [];
    if (!email) {
      errors = [...errors, 'Email is required'];
    }
    if (!firstName) {
      errors = [...errors, 'First name is required'];
    }
    if (!lastName) {
      errors = [...errors, 'Last name is required'];
    }
    if (!password) {
      errors = [...errors, 'Password is required'];
    }
    if (!type) {
      errors = [...errors, 'Type is required'];
    }
    if (!isAdmin) {
      errors = [...errors, 'Admin status is required'];
    }
    return errors;
  },
  generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7h' });
    return token;
  },
};

export default Helper;
