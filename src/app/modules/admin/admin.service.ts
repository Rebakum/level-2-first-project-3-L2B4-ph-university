import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilders';
import AppError from '../../Errors/appErrorr';
import { User } from '../user/user.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './adminModel';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await adminQuery.modelQuery;
  return result;
};
const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};
const updateAdminInDB = async (id: string, payLoad: Partial<TAdmin>) => {
  const { name, ...remainingAdmin } = payLoad;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingAdmin,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }
    const userId = deleteAdmin?.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
};
export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminInDB,
  deleteAdminFromDB,
};
