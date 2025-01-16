import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ServerConfig } from '../../config';
import AppError from '../../Errors/appErrorr';
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
  console.log(admissionSemister);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (!admissionSemister) {
      throw new AppError(httpStatus.NOT_FOUND, ' admissionSemister not found');
    }
    userData.id = await generateStudentId(admissionSemister);
    console.log(userData.id);
    // create a user{transaction-1}
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Filed to create user');
    }
    //set id, id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference id

    // create a student{transaction-2}
    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Filed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserService = {
  createStudentIntoDB,
};
