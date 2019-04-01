import UserService from '../services/user.service';

class UserController {
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
    return res.status(201).send({
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
