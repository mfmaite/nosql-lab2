import { InferType } from "yup";
import { pacienteSchema } from '../schema/paciente.schema';

type Paciente = InferType<typeof pacienteSchema>;

export { Paciente };
