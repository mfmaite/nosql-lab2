import { InferType } from "yup";
import { registroSchema } from '../schema/registro.schema';

type Registro = InferType<typeof registroSchema>;

export { Registro };
