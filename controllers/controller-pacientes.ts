import { Paciente } from '../types/paciente';
import { Registro } from '../types/registro';
import { ApiError, errors } from '../utils/apiError';
import { ciAlreadyExists, createPatient, createPatientRegistry } from '../services/pacientes';

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

async function crearRegistroPaciente(registro: Registro) {
  try {
    const existsCi = await ciAlreadyExists(registro.ci);
    if (!existsCi) throw new ApiError(errors.CI_NOT_FOUND);
    return createPatientRegistry(registro);

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
