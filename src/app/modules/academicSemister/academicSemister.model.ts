import { model, Schema } from 'mongoose';
import { TAcademicSemister } from './academicSemister.interface';
import {
  AcademicSemiterCode,
  AcademicSemiterName,
  Months,
} from './academicSemiter.constance';

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemiterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemiterCode,
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
    throw new Error('Semeter is already exists!');
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
);
