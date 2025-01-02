import { ServerConfig } from '../../config';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  // if password is not given, use deafult password
  userData.password = password || (ServerConfig.default_password as string);
  // if (!password) {
  //   password = ServerConfig.default_password as string;
  // } else {
  //   user.password = password;
  // }

  // set student role
  userData.role = 'student';

  //find academic semister info
  const admissionSemister = await AcademicSemister.findById(
    payLoad.admisionSemister,
  );
  userData.id = await generateStudentId(admissionSemister);
  // create a user
  const newResult = await User.create(userData);
  // create a student
  if (Object.keys(newResult).length) {
    //set id, id as user
    payLoad.id = newResult.id;
    payLoad.user = newResult._id; // reference id
    const newStudent = await Student.create(payLoad);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
