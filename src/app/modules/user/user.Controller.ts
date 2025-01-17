import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.servicie';
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // console.log(password, studentData);
  const result = await UserService.createStudentIntoDB(password, studentData);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});
export const UserCotrollers = {
  createStudent,
};
