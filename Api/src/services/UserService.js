/* eslint-disable max-len */
import Helper from './helper';
import UserData from '../data/user.data';
import User from '../models/user';

class UserService {
  static getUsers() {
    const { users } = UserData;
    const allUsers = users.map((user) => {
      const userInstance = new User(
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.password,
        user.type,
        user.isAdmin,
      );
      return userInstance;
    });
    return allUsers;
  }

  static getUserById(id) {
    const { users } = UserData;
    const parsedId = parseInt(id, Number);
    const userExists = users.find(userDetails => parsedId === userDetails.id);
    if (!userExists) {
      return {
        error: true,
        message: 'User not found',
        errorCode: 404,
      };
    }
    return {
      ...userExists,
    };
  }

  static signup(user) {
    const {
      email, firstName, lastName, password, type, isAdmin,
    } = user;
    const validatedUser = Helper.validateUser(user);
    const { errors, error } = validatedUser;
    if (errors.length > 0 && error) {
      return {
        ...validatedUser,
      };
    }
    const validEmail = Helper.isEmailValid(email);
    if (validEmail.error) {
      return {
        ...validEmail,
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

  static login(user) {
    const { email, password } = user;
    const { users } = UserData;
    const userExists = users.find(userDetails => email === userDetails.email && password === userDetails.password);
    if (!userExists) {
      return {
        error: true,
        message: 'Incorrect email or password',
        errorCode: 400,
      };
    }
    const token = Helper.generateToken(userExists);
    return {
      token,
      ...userExists,
    };
  }
}

export default UserService;
