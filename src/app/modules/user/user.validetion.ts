import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .max(20, { message: 'password can not be more than 20 characters' }),
});
export const UserValidation = {
  userValidationSchema,
};
