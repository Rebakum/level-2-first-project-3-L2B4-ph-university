import { Router } from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacaltyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemiter.route';
import { StudentRoutes } from '../modules/student/student.Route';
import { UsersRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacaltyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
