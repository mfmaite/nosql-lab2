const { firebaseClient } = require('../config/firebase');
const { ref, get, query, orderByChild, equalTo, push, set } = require('firebase/database');

const { BD_REFERENCES } = require('../networking/references');

async function ciAlreadyExists(ci) {
  try {
    const q = query(ref(firebaseClient, 'pacientes'), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);

    return snapshot.exists();
  } catch (error) {
    console.error('Error al consultar si el ci ya existe:', error);
    throw new Error('Error al consultar el ci en la base de datos');
  }
}

async function createPatient(nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email) {
  try {
    const pacientesRef = await push(ref(firebaseClient, BD_REFERENCES.pacientes));

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


async function createPatientRegistry(ci, fecha, tipo, diagnostico, medico, institucion, descripcion, medicacion) {
  try {
    const registroRef = await push(ref(firebaseClient, BD_REFERENCES.registro));

    await set(registroRef, {
      ci,
      fecha,
      tipo,
      diagnostico,
      medico,
      institucion,
      descripcion,
      medicacion
    });

    return {
      data: {
        message: 'Registro creado exitosamente',
        registroId: registroRef.key
      },
      status: 200
    };

  } catch (error) {
    console.error('Error al crear el registro:', error);
    return {
      data: {
        message: 'Hubo un error al crear el registro',
        error: error.message
      },
      status: 500
    };
  }

}
module.exports = { ciAlreadyExists, createPatient, createPatientRegistry };
