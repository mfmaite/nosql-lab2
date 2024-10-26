import { Paciente } from '../types/paciente';
import { ApiError, errors } from '../utils';
import { crearRegistroData } from '../schema/registro.schema';
import { ciAlreadyExists, createPatient, createPatientRegistry } from '../services';

async function crearPaciente(paciente: Paciente) {
  try {
    const existsCi = await ciAlreadyExists(paciente.ci);

    if (existsCi) throw new ApiError(errors.PACIENTE_ALREADY_EXISTS)

    return createPatient(paciente);
  } catch (error) {
    const err = error as ApiError;

    return {
      data: {
        error: err.message || 'Error interno del servidor',
      },
      status: err.status || 500,
    };
  }
}

async function crearRegistroPaciente(registro: crearRegistroData) {
  try {
    const existsCi = await ciAlreadyExists(registro.ci);
    if (!existsCi) throw new ApiError(errors.CI_NOT_FOUND);
    return createPatientRegistry({ ...registro, createdAt: new Date().toString() });

  } catch (error) {
    const err = error as ApiError;

    return {
      data: {
        error: err.message || 'Error interno del servidor',
      },
      status: err.status || 500,
    };
  }
}

export { crearPaciente, crearRegistroPaciente };
