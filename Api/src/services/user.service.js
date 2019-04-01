/* eslint-disable max-len */
import Helper from './helper';
import UserData from '../data/user.data';
import User from '../models/user.model';

class UserService {
  static signup(user) {
    const {
      email,
      firstName,
      lastName,
      password,
      type,
      isAdmin,
    } = user;
    const errors = Helper.validateUser(user);
    if (errors.length > 0) {
      return {
        errors,
        error: true,
        errorCode: 422,
        message: 'Some fields are missing.',
      };
    }
    const validEmail = Helper.isEmailValid(email);
    if (!validEmail) {
      return {
        error: true,
        errorCode: 422,
        message: 'Email provided is not valid',
      };
    }
    const { users } = UserData;
    const lastId = users[users.length - 1].id;
    const id = lastId + 1;
    const newUser = new User(id, email, firstName, lastName, password, type, isAdmin);
    UserData.users = [...UserData.users, newUser];
    const token = Helper.generateToken(newUser);
    return {
      token,
      ...newUser,
    };
  }
}

export default UserService;
