import { ApiError, ErrorData } from '../utils/apiError';
import * as yup from 'yup';

export function validateInput<SchemaType extends yup.AnySchema>(
  schema: SchemaType,
  input: yup.InferType<SchemaType>,
  error: ErrorData
) {
  try {
    schema.validateSync(input, { abortEarly: false });
  } catch (validationError) {
    const description = (validationError as yup.ValidationError).errors.join(', ');
    throw new ApiError({ ...error, description });
  }
}
