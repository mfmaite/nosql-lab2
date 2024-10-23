const { ref, push, set } = require('firebase/database');
const { firebaseClient } = require('../config/firebase');
const { ciAlreadyExists } = require('../models/pacientes');

async function crearPaciente(datos) {
  const { nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email } = datos;

  try {
    const existsCi = await ciAlreadyExists(ci);

    if (existsCi) throw new Error('Ya existe un paciente creado con esa cédula')

    const pacientesRef = push(ref(firebaseClient, 'pacientes'));
    await set(pacientesRef, {
      nombre,
      apellido,
      ci,
      fecha_nacimiento,
      sexo,
      telefono,
      direccion,
      email
    });

    return {
      data: {
        message: 'Paciente creado exitosamente',
        pacienteId: pacientesRef.key
      },
      status: 200
    };
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


module.exports = { crearPaciente, consultarHistoria};
