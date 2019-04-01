import UserService from '../services/user.service';

class UserController {
  static listUsers(req, res) {
    const allUsers = UserService.getUsers();
    return res.status(200).json({
      status: 200,
      data: allUsers,
    });
  }

  static getSingleUser(req, res) {
    const { id } = req.params;
    const foundUser = UserService.getUserById(id);
    if (foundUser.error) {
      const { errorCode, message } = foundUser;
      return res.status(errorCode).json({
        status: errorCode,
        message,
      });
    }
    return res.status(200).json({
      status: 200,
      user: foundUser,
    });
  }

  static signup(req, res) {
    const user = req.body;
    const createdUser = UserService.signup(user);
    if (createdUser.error) {
      const { errorCode, message, errors } = createdUser;
      return res.status(errorCode || 400).json({
        status: errorCode || 400,
        message,
        errors,
      });
    }
    return res.status(201).json({
      status: 201,
      data: createdUser,
    });
  }

  static login(req, res) {
    const user = req.body;
    const loggedinUser = UserService.login(user);
    if (loggedinUser.error) {
      return res.status(400).json({
        status: 400,
        message: loggedinUser.message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: loggedinUser,
    });
  }
}

export default UserController;
