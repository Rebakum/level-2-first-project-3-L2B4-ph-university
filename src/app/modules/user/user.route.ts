import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { createStudentValidationSchema } from '../student/studentValidation ';
import { UserCotrollers } from './user.Controller';

const router = express.Router();
//will call controller func

router.post(
  '/',
  validateRequest(createStudentValidationSchema),
  UserCotrollers.createStudent,
);

export const UsersRoutes = router;
