import httpStatus from 'http-status';
import AppError from './../../Errors/appErrorr';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
import { academicSeisterNameCodeMaper } from './academicSemiter.constance';

const createAcademicSemisterIntoDB = async (payLoad: TAcademicSemister) => {
  if (academicSeisterNameCodeMaper[payLoad.name] !== payLoad.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semister Code');
  }

  const result = await AcademicSemister.create(payLoad);
  return result;
};
const getAllAcademicSemisterFromDB = async () => {
  const result = await AcademicSemister.find();
  return result;
};
const getSingleAcademicSemisterFromDB = async (id: string) => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const updateAcademicSemisterIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicSemister>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSeisterNameCodeMaper[payLoad.name] !== payLoad.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemister.findByIdAndUpdate(
    { _id: id },
    payLoad,
    { new: true },
  );
  return result;
};

export const AcademicSemiterServices = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemisterFromDB,
  getSingleAcademicSemisterFromDB,
  updateAcademicSemisterIntoDB,
};
