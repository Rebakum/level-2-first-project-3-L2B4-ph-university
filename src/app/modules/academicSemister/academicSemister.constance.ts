import {
  TAcademicSemisterCode,
  TAcademicSemisterName,
  TAcademicSemisterNameCodeMapper,
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
export const AcademicSemisterName: TAcademicSemisterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemisterCode: TAcademicSemisterCode[] = ['01', '02', '03'];

export const academicSemisterNameCodeMaper: TAcademicSemisterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
