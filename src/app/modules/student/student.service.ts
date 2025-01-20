import httpStatus from 'http-status';
import mongoose from 'mongoose';

import AppError from '../../Errors/appErrorr';
import { User } from '../user/user.model';
import QueryBuilder from './../../builder/QueryBuilders';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // {email: {$regex : query.searchTerm, $options: i}}
  // {preasentAddress: {$regex : query.searchTerm, $options: i}}
  // {'name.firstName: {$regex : query.searchTerm, $options: i}}
  console.log('base query', query);
  // const queryObj = { ...query }; // copy
  // const studentSearchableFields = [
  //   'email',
  //   'name.firstName',
  //   'preasentAddress',
  // ];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // filtering
  // const excludaFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludaFields.forEach((el) => delete queryObj[el]);
  // const filterQueery = searchQuery
  //   .find(queryObj)
  //   .populate('admisionSemister')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // let sort = 'createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQueery.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const pagenatequery = sortQuery.skip(skip);
  // const limitQuery = pagenatequery.limit(limit);
  // field limiting
  // let fields = '-__v';
  //  fields: 'name,email' ata k
  //  fields: 'name email' emon korte hobe
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log({ fields });
  // }
  // const fieldsQuery = await limitQuery.select(fields);
  // return fieldsQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate({
        path: 'admisionSemister',
      })
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),

    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  console.log({ result });

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

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

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
