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
}

export default UserController;
