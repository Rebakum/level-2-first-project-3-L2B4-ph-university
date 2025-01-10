import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './studentValidation ';

const router = express.Router();
//will call controller func
router.get('/', StudentControllers.getAllStudent);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deletedStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updatedStudent,
);
export const StudentRoutes = router;
