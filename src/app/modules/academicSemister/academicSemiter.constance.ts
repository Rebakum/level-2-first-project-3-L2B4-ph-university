import {
  TAcademicSemisterNameCodeMapper,
  TAcademicSemiterCode,
  TAcademicSemiterName,
  TMonths,
} from './academicSemister.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemiterName: TAcademicSemiterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemiterCode: TAcademicSemiterCode[] = ['01', '02', '03'];

export const academicSeisterNameCodeMaper: TAcademicSemisterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
