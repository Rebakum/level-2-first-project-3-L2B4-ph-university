import { z } from 'zod';
import {
  AcademicSemiterCode,
  AcademicSemiterName,
  Months,
} from './academicSemiter.constance';

const createAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemiterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemiterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});
const updatedAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemiterName] as [string, ...string[]]).optional(),
    code: z.enum([...AcademicSemiterCode] as [string, ...string[]]).optional(),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemisterValidations = {
  createAcademicSemisterValidationSchema,
  updatedAcademicSemisterValidationSchema,
};
