import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFacalty.validation';
import { AcademicFacultyControllers } from './academicFaculty,controller';

const router = express.Router();
router.post(
  '/',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:FacultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:FacultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacaltyRoutes = router;
