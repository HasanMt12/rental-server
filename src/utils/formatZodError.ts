import { ZodError } from 'zod';

const formatZodErrors = (zodError: ZodError) =>
  zodError.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

export default formatZodErrors;
