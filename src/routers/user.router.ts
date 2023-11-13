import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { EUserRoles } from "../enums/user-roles.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkRole([EUserRoles.admin, EUserRoles.manager]),
  commonMiddleware.isQueryValid(10, "createdAt"),
  userController.getAll,
);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.get(
  "/:userId",
  authMiddleware.checkRole([EUserRoles.admin, EUserRoles.manager]),
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateUser,
);
router.delete(
  "/:userId",
  authMiddleware.checkRole([EUserRoles.admin, EUserRoles.manager]),
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);

export const userRouter = router;
