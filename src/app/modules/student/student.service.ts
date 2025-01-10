import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../Errors/appErrorr';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admisionSemister')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admisionSemister')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
// for update
const updatedStudentIntoDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /*
  guardin: {
  fatherOccupation = Teacher
  }
  guardian.fatherOccupaytion = Teacher
  name.firstName = 'Mezba'
  name.lastName = 'Abedin'
  */
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifiedUpdatedData[`name.${key}`] = value;
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian))
      modifiedUpdatedData[`guardian.${key}`] = value;
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian))
      modifiedUpdatedData[`localGuardian.${key}`] = value;
  }

  console.log(modifiedUpdatedData);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  console.log(result);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found for update');
  }
  return result;
};

// for delete
const deletedStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Filed to deleted student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Filed to deleted user');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Filed  deleted student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deletedStudentFromDB,
  updatedStudentIntoDB,
};
