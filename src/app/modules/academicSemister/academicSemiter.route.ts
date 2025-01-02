import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidations } from './academicSemister.validation';
import { AcademicSemisterCotrollers } from './academicSemiter.controller';
const router = express.Router();
router.post(
  '/',
  validateRequest(
    AcademicSemisterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemisterCotrollers.createAcademicSemister,
);
router.get('/', AcademicSemisterCotrollers.getAllAcademicSemisters);
router.get(
  '/:semisterId',
  AcademicSemisterCotrollers.getSingleAcademicSemisters,
);
router.patch(
  '/:semisterId',
  validateRequest(
    AcademicSemisterValidations.updatedAcademicSemisterValidationSchema,
  ),
  AcademicSemisterCotrollers.updateAcademicSemisters,
);

export const AcademicSemisterRoutes = router;
