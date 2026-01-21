export const handleMongooseError = (error: any, _doc: any, next: (err?: any) => void) => {
  const { name, code } = error;

  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  next(error);
};
