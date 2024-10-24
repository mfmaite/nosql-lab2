const { ciAlreadyExists, createPatient } = require('../services/pacientes');

async function crearPaciente(datos) {
  const { nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email } = datos;

  try {
    const existsCi = await ciAlreadyExists(ci);

    if (existsCi) throw new Error('Ya existe un paciente creado con esa cédula');

    return createPatient(nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email);
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    return {
      data: {
        message: 'Hubo un error al crear el paciente',
        error: error.message
      },
      status: 500
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


module.exports = { crearPaciente, consultarHistoria };
