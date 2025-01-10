import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentINtoDB = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDpartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payLoad,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServies = {
  createAcademicDepartmentINtoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDpartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
