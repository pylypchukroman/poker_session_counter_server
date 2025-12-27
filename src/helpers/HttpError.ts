interface HttpErrorType extends Error {
  status: number;
}

export const HttpError = (status: number, message: string) => {
  const error = new Error(message) as HttpErrorType;
  error.status = status;
  return error;
};
