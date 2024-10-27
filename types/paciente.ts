import { InferType } from "yup";
import { pacienteSchema } from '../schema/paciente.schema.js';

type Paciente = InferType<typeof pacienteSchema>;

export { Paciente };
