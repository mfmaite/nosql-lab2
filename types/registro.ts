import { InferType } from "yup";
import { registroSchema } from '../schema/registro.schema.js';

type Registro = InferType<typeof registroSchema>;

export { Registro };
