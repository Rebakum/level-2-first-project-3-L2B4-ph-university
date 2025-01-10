import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};
//year Semister code 4 digit number
export const generateStudentId = async (payLoad: TAcademicSemister) => {
  //first time 0000
  let currentId = (0).toString(); //0000 by default
  const lastStudentId = await findLastStudentId(); //2030 01 0001
  const lastStudentSemisterCode = lastStudentId?.substring(4, 6); // code 01
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemisterCode = payLoad.code;
  const currentYear = payLoad.year;
  if (
    lastStudentId &&
    lastStudentSemisterCode === currentSemisterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
};
