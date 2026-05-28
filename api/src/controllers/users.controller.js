import { UsersService } from "../services/users.service.js";

const usersService = new UsersService();

export async function getMe(req, res, next) {
  try {
    res.json({
      message: "User profile fetched successfully.",
      data: await usersService.getMe(req.auth.userId)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMe(req, res, next) {
  try {
    res.json({
      message: "User profile updated successfully.",
      data: await usersService.updateMe(req.auth.userId, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function changeMyPassword(req, res, next) {
  try {
    res.json({
      message: "Password changed successfully.",
      data: await usersService.changeMyPassword(req.auth.userId, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMyAvatar(req, res, next) {
  try {
    res.json({
      message: "User avatar updated successfully.",
      data: await usersService.updateMyAvatar(req.auth.userId, req.file)
    });
  } catch (error) {
    next(error);
  }
}

export async function deactivateMe(req, res, next) {
  try {
    res.json({
      message: "User account deactivated successfully.",
      data: await usersService.deactivateMe(req.auth.userId)
    });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    res.json({
      message: "Users fetched successfully.",
      data: await usersService.listUsers(req.query)
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    res.json({
      message: "User fetched successfully.",
      data: await usersService.getUserById(req.params.id)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(req, res, next) {
  try {
    res.json({
      message: "User status updated successfully.",
      data: await usersService.updateUserStatus(req.params.id, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    res.json({
      message: "User role updated successfully.",
      data: await usersService.updateUserRole(req.params.id, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function deactivateUser(req, res, next) {
  try {
    res.json({
      message: "User deactivated successfully.",
      data: await usersService.updateUserStatus(req.params.id, { isActive: false })
    });
  } catch (error) {
    next(error);
  }
}
