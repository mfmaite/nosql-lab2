import { ciAlreadyExists, createPatient } from '../services/pacientes.js';

async function crearPaciente(datos) {
  const { nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email } = datos;

  try {
    const existsCi = await ciAlreadyExists(ci);

    if (existsCi) throw { message: 'Ya existe un paciente creado con esa cédula', status: 401 };

    return createPatient(nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email);
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    return {
      data: {
        error: error.message,
      },
      status: error.status,
    };
  }
}

async function consultarHistoria(datos) {
    const { ci } = datos;
    return {
      data: {
        result: "Historia clinica del paciente " + ci
      }, status: 200
    };
}


export { crearPaciente, consultarHistoria };
