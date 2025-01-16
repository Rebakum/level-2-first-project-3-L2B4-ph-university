import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /"(.+?)"/; // Matches text inside the first pair of double quotes
  const match = err.message.match(regex); // Use err.message instead of errorString
  const errorSources: TErrorSources = [
    {
      path: err.keyValue || {},
      message: `${match ? match[1] : 'UnKnown duplicate value'} already Exits`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};
export default handleDuplicateError;
