import { Router } from 'express';
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
    path: '/academic-Semisters',
    route: AcademicSemisterRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
