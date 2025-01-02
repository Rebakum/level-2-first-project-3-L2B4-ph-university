import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemiterServices } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemiterServices.createAcademicSemisterIntoDB(
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
  const result = await AcademicSemiterServices.getAllAcademicSemisterFromDB();
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
    await AcademicSemiterServices.getSingleAcademicSemisterFromDB(semisterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is recived succesfully',
    data: result,
  });
});
const updateAcademicSemisters = catchAsync(async (req, res) => {
  const { semisterId } = req.params;
  const result = await AcademicSemiterServices.updateAcademicSemisterIntoDB(
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
