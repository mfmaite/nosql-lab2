import { Paciente } from '../types/paciente';
import { Registro } from '../types/registro';
import { ciAlreadyExists, createPatient, createPatientRegistry } from '../services/pacientes';

async function crearPaciente(paciente: Paciente) {
  try {
    const existsCi = await ciAlreadyExists(paciente.ci);

    if (existsCi) throw { message: 'Ya existe un paciente creado con esa cédula', status: 401 };

    return createPatient(paciente);
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    const err = error as { message: string; status?: number };
    return {
      data: {
        error: err.message,
      },
      status: err.status,
    };
  }
}

async function consultarHistoria(ci: string) {
    return {
      data: {
        result: "Historia clinica del paciente " + ci
      }, status: 200
    };
}

async function crearRegistroPaciente(registro: Registro) {
  try{
    const existsCi = await ciAlreadyExists(registro.ci);
    if (!existsCi) throw { message: "No existe un paciente con esta cedula", status: 402 };
    return createPatientRegistry(registro);

  } catch(error) {
    const err = error as { message: string; status?: number };
    console.error('Error al crear el registro:', error);
    return {
      data: {
        error: err.message,
      },
      status: err.status,
    };
  }
}

export { crearPaciente, consultarHistoria, crearRegistroPaciente };
