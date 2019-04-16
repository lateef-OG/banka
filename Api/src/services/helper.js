import jwt from 'jsonwebtoken';

require('dotenv').config();

const Helper = {
  isEmailValid(email) {
    const emailTest = /\S+@\S+\.\S+/.test(email);
    if (!emailTest) {
      return {
        error: true,
        errorCode: 422,
        message: 'Email provided is not valid',
      };
    }
    return {
      error: false,
    };
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
    return {
      errors,
      error: true,
      errorCode: 422,
      message: 'Some fields are missing.',
    };
  },
  generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7h' });
    return token;
  },
};

export default Helper;
