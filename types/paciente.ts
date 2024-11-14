import { InferType } from "yup";
import { pacienteSchema } from '../schema/paciente.schema.js';
import { Registro } from "./registro.js";

type PacienteSinRegistro = InferType<typeof pacienteSchema>;

type Paciente = PacienteSinRegistro & {
  registro: Registro[];
}

export { Paciente };
