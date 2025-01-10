import { z } from 'zod';

// Gender and Blood Group Enums
const genderEnum = z.enum(['male', 'female', 'other']);
const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

// Sub-schemas for Guardian, UserName, and LocalGuardian
const createUserNameValidationSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required'),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z
    .string()
    .nonempty('Mother contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  occupation: z.string().nonempty('Occupation is required'),
  contactNo: z
    .string()
    .nonempty('Contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  address: z.string().nonempty('Address is required'),
});

// Main Student ValidationSchema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty('Password is required').max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: genderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: z
        .string()
        .nonempty('Contact number is required')
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required')
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
      bloodGroup: bloodGroupEnum,
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: createGuardianValidationSchema,
      admisionSemister: z.string(),
      academicDepartment: z.string(),
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().url('Invalid URL format').optional(),
    }),
  }),
});
// updated Sub-schemas for Guardian, UserName, and LocalGuardian
const updateUserNameValidationSchema = z.object({
  firstName: z.string().nonempty('First name is required').optional(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required').optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required').optional(),
  fatherOccupation: z
    .string()
    .nonempty('Father occupation is required')
    .optional(),
  motherName: z.string().nonempty('Mother name is required').optional(),
  motherOccupation: z
    .string()
    .nonempty('Mother occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .nonempty('Mother contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty('Name is required').optional(),
  occupation: z.string().nonempty('Occupation is required').optional(),
  contactNo: z
    .string()
    .nonempty('Contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
    .optional(),
  address: z.string().nonempty('Address is required').optional(),
});

// Main Student ValidationSchema
export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty('Password is required').max(20).optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: genderEnum.optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z
        .string()
        .nonempty('Contact number is required')
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
        .optional(),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required')
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
        .optional(),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z
        .string()
        .nonempty('Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .nonempty('Permanent address is required')
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      admisionSemister: z.string().optional(),
      academicDepartment: z.string().optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().url('Invalid URL format').optional(),
    }),
  }),
});

// Export the Validationschema
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
