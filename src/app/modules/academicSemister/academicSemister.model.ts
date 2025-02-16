import { model, Schema } from 'mongoose';
import AppError from '../../Errors/appErrorr';
import { TAcademicSemister } from './academicSemister.interface';

import httpStatus from 'http-status';
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemister.constance';

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemisterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemisterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
academicSemisterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semeter is already exists!');
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
);
