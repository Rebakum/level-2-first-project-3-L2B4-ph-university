export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcademicSemiterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemiterCode = '01' | '02' | '03';
export type TAcademicSemister = {
  name: TAcademicSemiterName;
  code: TAcademicSemiterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
export type TAcademicSemisterNameCodeMapper = {
  [key: string]: string;
};
