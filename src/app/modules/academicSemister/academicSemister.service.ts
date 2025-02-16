import httpStatus from 'http-status';
import AppError from './../../Errors/appErrorr';

import { academicSemisterNameCodeMaper } from './academicSemister.constance';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createAcademicSemisterIntoDB = async (payLoad: TAcademicSemister) => {
  if (academicSemisterNameCodeMaper[payLoad.name] !== payLoad.code) {
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
    academicSemisterNameCodeMaper[payLoad.name] !== payLoad.code
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

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemisterFromDB,
  getSingleAcademicSemisterFromDB,
  updateAcademicSemisterIntoDB,
};
