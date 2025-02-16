import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemisterServices } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.createAcademicSemisterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is created succesfully',
    data: result,
  });
});

const getAllAcademicSemisters = catchAsync(async (req, res) => {
  const result = await AcademicSemisterServices.getAllAcademicSemisterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is recived succesfully',
    data: result,
  });
});
const getSingleAcademicSemisters = catchAsync(async (req, res) => {
  const { semisterId } = req.params;
  const result =
    await AcademicSemisterServices.getSingleAcademicSemisterFromDB(semisterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is recived succesfully',
    data: result,
  });
});
const updateAcademicSemisters = catchAsync(async (req, res) => {
  const { semisterId } = req.params;
  const result = await AcademicSemisterServices.updateAcademicSemisterIntoDB(
    semisterId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is retrived succesfully',
    data: result,
  });
});
export const AcademicSemisterCotrollers = {
  createAcademicSemister,
  getAllAcademicSemisters,
  getSingleAcademicSemisters,
  updateAcademicSemisters,
};
