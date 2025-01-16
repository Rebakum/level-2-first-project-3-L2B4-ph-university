import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  // Ensure proper typing for errorSources
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    // Type guard for mongoose.Error.ValidatorError and mongoose.Error.CastError
    if (
      val instanceof mongoose.Error.ValidatorError ||
      val instanceof mongoose.Error.CastError
    ) {
      return {
        path: val.path,
        message: val.message,
      };
    }
    return {
      path: 'unknown',
      message: 'An unexpected validation error occurred.',
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
